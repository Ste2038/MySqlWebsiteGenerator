const mysql = require('mysql2');
const fs = require('fs');
  
const Constants = require('./Constants')

const db = mysql.createConnection({
  host: Constants.db_host,
  user: Constants.db_user,
  password: Constants.db_pass,
  database: Constants.db_name
});

db.connect(function(err){
  if(err) throw err;
  Connected = true;
  console.log("DB: Connected!");

  start();
});

function start(){
  let pathList = getPathList(Constants.template_paths);

  getDataFromCreateTable(function(tables){
    pathList.forEach(path => {
      readFile(path, function(data){
        if(path.includes("example-table")){
          tables.forEach(table => {
            let newData = elabFileTable(table, data);
            let newPath = path.replaceAll("template", "output").replaceAll("example-table", table.name.toLowerCase() + "-table");
            writeFile(newPath, newData);
          });
        }
        else{
          data = elabFileDatabase(tables, data);
          let newPath = path.replaceAll("template", "output");
          writeFile(newPath, data);
        }
      });
    });
  });
}

function getPathList(startingList){
  let pathList = [];

  startingList.forEach(path => {
    let fs_path = fs.statSync(path);
    if(fs_path.isFile()){
      pathList.push(path);
    }
    else{
      let fileList = fs.readdirSync(path);
      for(const file of fileList){
        pathList.push(`${path}/${file}`);
        pathList = getPathList(pathList);
      }
    }
  });
  return pathList;
}

// SHOW TABLES
function executeQuery(query, callback){
  if(!Connected){
    console.log("DB: Not connected!");
    return;
  }

  //console.log(query);
  db.query(query, function(err, result){
    if(err) throw err;
    callback(result);
  });
}

function showTables(callback){
  let sql = "SHOW TABLES;";

  executeQuery(sql, function(result){
    let tables = [];
    result.forEach(table => {
      tables.push(table['Tables_in_' + Constants.db_name]);
    });
    callback(tables);
  });
}

function showCreateTables(tables, createTables, callback){
  if(tables.length == 0){
    callback(createTables);
    return;
  }

  let sql = "SHOW CREATE TABLE `"+ Constants.db_name + "`.`" + tables[0] +"`; ";
  tables = tables.slice(1);

  executeQuery(sql, function(result){
    createTables.push(result[0]);
    showCreateTables(tables, createTables, callback);
  });
}

function elabCreateTable(createTable){
  let data = {"name": createTable.Table, "attrib": []};

  let ct = createTable['Create Table'];
  //console.log(ct);
  ct = ct.replaceAll("CREATE TABLE `" + createTable.Table + "` (\n", "");
  ct = ct.replaceAll(" COLLATE utf8mb4_unicode_520_ci", "");
  ct = ct.replaceAll(" COLLATE=utf8mb4_unicode_520_ci", "");
  //ct = ct.replaceAll("ENGINE=InnoDB", "");
  ct = ct.replaceAll("DEFAULT", "");
  ct = ct.replaceAll("CHARSET=utf8mb4", "");
  ct = ct.replaceAll("int unsigned", "int_unsigned");
  ct = ct.replaceAll("  `", "`");
  //ct = ct.replaceAll("\\n  ", "\n");
  //console.log(ct);
  ct = ct.split("\n");

  ct.forEach(line => {
    if(!line.includes("PRIMARY KEY") && !line.includes("KEY") && !line.includes("CONSTRAINT") && !line.includes("ENGINE")){
      //console.log(line);
      let newData = {
        attrib_name: line.split(" ")[0].slice(1, -1),
        attrib_type: line.split(" ")[1],
        isNotNull: line.includes("NOT NULL"),
        isAutoIncrement: line.includes("AUTO_INCREMENT"),
      };

      data.attrib.push(newData);
    }
  });

  //console.log(data);
  return data;
}

function getDataFromCreateTable(callback){
  showTables(function(tables){
    showCreateTables(tables, [], function(createTables){
      let tablesData = [];
      createTables.forEach(createTable => {
        let data = elabCreateTable(createTable);
        tablesData.push(data);
      });
      callback(tablesData);
    });
  });
}

function readFile(path, callback){
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    callback(data);
  });
}

function elabFileTable(table, data){
  data = data.replaceAll("$[UC_name]", table.name);
  data = data.replaceAll("$[LC_name]", table.name.toLowerCase());

  let reg = /\$\[for_attrib \([a-zA-Z\s\n\$\[\]\{\}\-\_\.\:\=\;\<\>\"\/\'\,\!\*]*\)\]/g;

  if(reg.test(data)){
    let rawDataPattern = data.match(reg)[0];
    let dataPattern = rawDataPattern.replaceAll("$[for_attrib (", "").replaceAll(")]", "");
    let msgData = "";

    //console.log(dataPattern);
    table.attrib.forEach(dataTable => {
      let msg = dataPattern;
      msg = msg.replaceAll("$[attrib_name]", dataTable.attrib_name);
      //msg = msg.replaceAll("$[attrib_type]", data.attrib_type);

      switch(dataTable.attrib_type){
        case "int":
        case "int_unsigned":
        case "tinyint(1)":
        case "tinyint_unsigned":
        case "float":
        case "datetime":
          msg = msg.replaceAll("$[attrib_type]", "number");
          msg = msg.replaceAll("$[attrib_init]", "0");
        break;  

        case "char(50)":
        case "char(200)":
        case /char\([0-9]*\)/:
          msg = msg.replaceAll("$[attrib_type]", "string");
          msg = msg.replaceAll("$[attrib_init]", "\"\"");
        break;
      }
      msgData += msg + "\n  ";
    });

    data = data.replaceAll(reg, msgData);
  }
  
  return data;
}

function elabFileDatabase(tables, data){
  let reg = /\$\[for_table \([a-zA-Z\s\n\$\[\]\{\}\-\_\.\:\=\;\<\>\"\/\'\,\!\*]*\)\]/g;

  if(reg.test(data)){
    let rawDataPattern = data.match(reg)[0];
    let dataPattern = rawDataPattern.replaceAll("$[for_table (", "").replaceAll(")]", "");
    let msgData = "";

    //console.log(dataPattern);
    tables.forEach(table => {
      let msg = dataPattern;
      msg = msg.replaceAll("$[UC_table_name]", table.name);
      msg = msg.replaceAll("$[LC_table_name]", table.name.toLowerCase());
      msgData += msg + "\n  ";
    });

    data = data.replaceAll(reg, msgData);
  }
  return data;
}

function writeFile(name, data){
  let path = ".";
  let pieces = name.split("/");
  for(let i = 0; i < pieces.length - 1; i++){
    path += "/" + pieces[i];
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, 0744);
    }
  }
  path += pieces[pieces.length - 1];

  fs.writeFile(name, data, function(err){
    if (err)
      console.log(err);
    else {
      console.log(name + " written successfully");
    }
  });
}