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
  showTables(function(tables){
    tables.forEach(table => {
      //console.log(table['Tables_in_' + Constants.db_name]);
      showCreateTable(table['Tables_in_' + Constants.db_name], function(createTable){
        getDataFromCreateTable(JSON.stringify(createTable), table['Tables_in_' + Constants.db_name], function(tableData){
          writeFile(Constants.template_paths, tableData, table['Tables_in_' + Constants.db_name]);
        })
      });
    });
  });
}

// SHOW TABLES
function showTables(callback){
  let sql = "SHOW TABLES;";

  executeQuery(sql, function(result){
    callback(result);
  });
}

function showCreateTable(table, callback){
  let sql = "SHOW CREATE TABLE `"+ Constants.db_name + "`.`" + table +"`;";

  executeQuery(sql, function(result){
    callback(result);
  });
}

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

function getDataFromCreateTable(createTable, tableName, callback){
  let ct = createTable;
  let data = [];

  //console.log(ct + "\n");
  ct = ct.replaceAll("[{\"Table\":\"" + tableName + "\",\"Create Table\":\"CREATE TABLE `" + tableName + "` (\\n  ", "");
  ct = ct.replaceAll(" COLLATE utf8mb4_unicode_520_ci", "");
  ct = ct.replaceAll(" COLLATE=utf8mb4_unicode_520_ci", "");
  ct = ct.replaceAll(" ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", "");
  ct = ct.replaceAll("int unsigned", "int_unsigned");
  ct = ct.replaceAll("\\n  ", "\n");
  ct = ct.split("\n");
  ct.forEach(line => {
    if(!line.includes("PRIMARY KEY") && !line.includes("KEY") && !line.includes("CONSTRAINT")){
      let newData = {
        attrib_name: line.split(" ")[0].slice(1, -1),
        attrib_type: line.split(" ")[1],
        isNotNull: line.includes("NOT NULL"),
        isAutoIncrement: line.includes("AUTO_INCREMENT"),
      };

      data.push(newData);
      //console.log(line);
      //console.log(newData);
    }
  });

  //console.log("\n\n");
  callback(data);
}

function writeFile(templatePaths, tableData, tableName){
  templatePaths.forEach(templatePath => {
    readTemplate(templatePath, function(templateData){
      templateData = templateData.replaceAll("$[UC_name]", tableName);
      templateData = templateData.replaceAll("$[LC_name]", tableName.toLowerCase());

      let reg = /\$\[for_attrib \([a-z\s\$\[\]\_\:\=\;]*\)\]/g;
      if(reg.test(templateData)){
        let rawDataPattern = templateData.match(reg)[0];
        let dataPattern = rawDataPattern.replaceAll("$[for_attrib (", "").replaceAll(")]", "");
        let msgData = "";
        //console.log(dataPattern);
        tableData.forEach(data => {
          let msg = dataPattern;
          msg = msg.replaceAll("$[attrib_name]", data.attrib_name);
          //msg = msg.replaceAll("$[attrib_type]", data.attrib_type);

          switch(data.attrib_type){
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

        templateData = templateData.replaceAll(reg, msgData);
      }

      let fileName = templatePath.replaceAll("template", "output").replaceAll("name", tableName.toLowerCase())
      fs.writeFile(fileName, templateData, function(err){
        if (err)
          console.log(err);
        else {
          console.log(fileName + " written successfully\n");
        }
      });
      //console.log(templateData);

    });
  });
}

function readTemplate(path, callback){
  if(path == "./template/name.spec.ts"){
    callback("import { $[UC_name] } from './$[LC_name]';\n\ndescribe('$[UC_name]', () => {\n  it('should create an instance', () => {\n    expect(new $[UC_name]()).toBeTruthy();\n  });\n});");
  }
  else if(path == "./template/name.ts"){
    callback("export class $[UC_name]{\n  $[for_attrib (public $[attrib_name]: $[attrib_type] = $[attrib_init];)]\n}");
  }
  else{
    callback("");
  }
}