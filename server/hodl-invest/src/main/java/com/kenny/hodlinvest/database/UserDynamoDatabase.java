package com.kenny.hodlinvest.database;

import com.amazonaws.services.dynamodbv2.document.*;
import com.google.gson.Gson;
import com.kenny.hodlinvest.exception.UserException;
import com.kenny.hodlinvest.exception.UserNotFoundException;
import com.kenny.hodlinvest.model.Transaction;
import com.kenny.hodlinvest.model.User;
import com.kenny.hodlinvest.util.StringValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class UserDynamoDatabase {

    @Autowired
    private DynamoClient dynamoClient;
    @Autowired
    Gson gson;

    public static final String USER_KEY = "username";

    public void insertUser(User user){
        if(user == null)
            throw new UserException("Can not insert null user into database");
        else if(user.getPasswordHash().equals("")){
            throw new UserException("Password can not be blank");
        } else if(!StringValidator.validateUsername(user.getUsername())){
            throw new UserException("Username has to be 4 to 20 characters long and only contain alphanumerics");
        } else if(!StringValidator.validateEmail(user.getEmail())){
            throw new UserException("Invalid email format");
        }

        DynamoDB dynamoDB = dynamoClient.getDynamoDB();
        Table table = dynamoDB.getTable(dynamoClient.getUsersTableName());

        table.putItem(Item.fromJSON(gson.toJson(user, User.class)));
    }

    public User selectUser(String username){
        DynamoDB dynamoDB = dynamoClient.getDynamoDB();
        Table table = dynamoDB.getTable(dynamoClient.getUsersTableName());

        Item item = table.getItem(new PrimaryKey(USER_KEY, username));

        if(item == null){
            throw new UserNotFoundException("User " + username + " does not exists");
        }

        return gson.fromJson(item.toJSON(), User.class);
    }

    public void updateUserMoney(String username, double playMoney){
        DynamoDB dynamoDB = dynamoClient.getDynamoDB();
        Table table = dynamoDB.getTable(dynamoClient.getUsersTableName());

        Map<String, String> expressionAttributeNames = new HashMap<>();
        expressionAttributeNames.put("#PM", "playMoney");

        Map<String, Object> expressionAttributeValues = new HashMap<>();
        expressionAttributeValues.put(":val1", playMoney);

        System.out.println(username + " " + playMoney);
        UpdateItemOutcome outcome = table.updateItem("username", username, "set #PM = :val1", expressionAttributeNames, expressionAttributeValues);
        System.out.println(outcome.getUpdateItemResult().toString());
    }

    public void updateUserPortfolio(String username, Map<String, Double> portfolio){
        DynamoDB dynamoDB = dynamoClient.getDynamoDB();
        Table table = dynamoDB.getTable(dynamoClient.getUsersTableName());

        Map<String, String> expressionAttributeNames = new HashMap<>();
        expressionAttributeNames.put("#P", "portfolio");

        Map<String, Object> expressionAttributeValues = new HashMap<>();
        expressionAttributeValues.put(":val1", portfolio);

        UpdateItemOutcome outcome = table.updateItem("username", username, "set #P = :val1", expressionAttributeNames, expressionAttributeValues);
        System.out.println(outcome.toString());
    }

    public void updateUserTransactions(String username, List<Transaction> transactions){
        DynamoDB dynamoDB = dynamoClient.getDynamoDB();
        Table table = dynamoDB.getTable(dynamoClient.getUsersTableName());

        Map<String, String> expressionAttributeNames = new HashMap<>();
        expressionAttributeNames.put("#T", "transactions");

        Map<String, Object> expressionAttributeValues = new HashMap<>();
        expressionAttributeValues.put(":val1", transactions);

        UpdateItemOutcome outcome = table.updateItem("username", username, "set #T = :val1", expressionAttributeNames, expressionAttributeValues);
        System.out.println(outcome.toString());
    }
}
