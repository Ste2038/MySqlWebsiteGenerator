# MySqlWebsiteGenerator
Outputs an easy website to access, view, modify your mySql database

# Supported tags
## Per Table
### Table
- "$[UC_name]": Table name (Uppercase first letter)
- "$[LC_name]": Table name (All lowercase)
- "$[for_attrib (...)]": Repeats (...) per each attribute of the table

### Attribute
- "$[attrib_name]": Attribute name
- "$[attrib_type]": Attribute type
- "$[attrib_init]": Attribute default value

## Per Database
### Database
- "$[for_table (...)]": Repeats (...) per each table

### Table
- "$[UC_table_name]":  Table name (Uppercase first letter)
- "$[LC_table_name]":  Table name (All lowercase)

Folder or file containing "example-table" will be produced one per table, otherwise only one copy will be made.