#!/bin/bash
PSQL='psql -U postgres -c'

#LIMPA A DB, A FINS DE TESTE:
psql -U postgres -d pathologicquotes --tuples-only --no-align -c "TRUNCATE TABLE characters CASCADE"
psql -U postgres -d pathologicquotes --tuples-only --no-align -c "TRUNCATE TABLE quotes CASCADE"
psql -U postgres --tuples-only --no-align -c "DROP DATABASE pathologicquotes"


$PSQL 'CREATE DATABASE pathologicquotes'

PSQL='psql -U postgres -d pathologicquotes --tuples-only --no-align -c'

#TABELA DOS PERSONAGENS
$PSQL 'CREATE TABLE characters()'

#TABELA DAS QUOTES
$PSQL 'CREATE TABLE quotes()'

#CRIA AS VARIAVEIS
    #PERSONAGENS
    $PSQL 'ALTER TABLE characters ADD COLUMN character_id SERIAL PRIMARY KEY'
    $PSQL 'ALTER TABLE characters ADD COLUMN name VARCHAR(100) NOT NULL'
    #QUOTES
    $PSQL 'ALTER TABLE quotes ADD COLUMN quote_id SERIAL PRIMARY KEY'
    $PSQL 'ALTER TABLE quotes ADD COLUMN character_id INT'
    $PSQL 'ALTER TABLE quotes ADD FOREIGN KEY (character_id) REFERENCES characters(character_id)'
    $PSQL 'ALTER TABLE quotes ADD COLUMN quote VARCHAR(300) NOT NULL'

    

cat data.txt | while IFS='/' read  NAME QUOTE; do

ID=$($PSQL "SELECT character_id FROM characters WHERE name='$NAME'")
if [ -z "$ID"  ]
then
$PSQL "INSERT INTO characters(name) VALUES ('$NAME')"
AUX=$($PSQL "SELECT character_id FROM characters WHERE name='$NAME'")
$PSQL "INSERT INTO quotes(quote,character_id) VALUES ('$QUOTE','$AUX')"
else
$PSQL "INSERT INTO quotes(quote,character_id) VALUES ('$QUOTE','$ID')"
fi









done

$PSQL "SELECT name,quote FROM characters RIGHT JOIN quotes ON quotes.character_id=characters.character_id"
