package com.kenny.hodlinvest.database;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.PrimaryKey;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.google.gson.Gson;
import com.kenny.hodlinvest.model.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserDynamoDatabase {

    @Autowired
    private DynamoClient dynamoClient;

    @Autowired
    private Gson gson;

    public static final String TOKEN_KEY = "username";

    public void insertToken(Token token){
        DynamoDB dynamoDB = dynamoClient.getDynamoDB();
        Table table = dynamoDB.getTable(dynamoClient.getTokenTableName());

        table.putItem(Item.fromJSON(gson.toJson(token))).getPutItemResult();
    }

    public Token selectToken(String username){
        DynamoDB dynamoDB = dynamoClient.getDynamoDB();
        Table table = dynamoDB.getTable(dynamoClient.getTokenTableName());

        Item item = table.getItem(new PrimaryKey(TOKEN_KEY, username));

        if(item == null)
            return null;

        System.out.println(item.toJSON());
        return gson.fromJson(item.toJSON(), Token.class);
    }
}
