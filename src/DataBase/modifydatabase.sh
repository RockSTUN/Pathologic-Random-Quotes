#!/bin/bash
PSQL='psql -U postgres -d pathologicquotes --no-align --tuples-only -c'

REMOVEQUOTE (){
    echo "Not Available"
}

INSEREQUOTE (){
    echo "Quote: "
    read QUOTE 
    $PSQL "INSERT INTO quotes(quote) VALUES ('$QUOTE')"
}

ADDPERSONAGEM (){
    echo "nome do personagem: "
    read PERSONAGEM
    $PSQL "INSERT INTO characters(name) VALUES ('$PERSONAGEM')"
} 

GETQUOTE () {
# shopt -s nocasematch
# shopt -s lastpipe

echo "Personagem: "
read PERSONAGEM
CHECK_P=$($PSQL "SELECT name FROM characters WHERE name='$PERSONAGEM'")
if [[ $CHECK_P == $PERSONAGEM ]]
    then
    INSEREQUOTE
    else
    ADDPERSONAGEM
    INSEREQUOTE

fi

}

MENU () {

echo -e "1 - Adicionar Personagem\n2 - Remover Personagem\n3 - SAIR"
read OPTION
if [[ $OPTION == 1 ]]
then 
    GETQUOTE
elif [[ $OPTION == 2 ]]
then 
    REMOVEQUOTE
elif [[ $OPTION == 3 ]]
then 
    echo 'Goodbye!'
else
    MENU 'Insira uma opção válida'
fi
}


MENU $OPTION



