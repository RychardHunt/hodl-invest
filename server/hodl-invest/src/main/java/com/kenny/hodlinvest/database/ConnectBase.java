// AUTHOR: ALEX WU 4/15/2018
package com.kenny.hodlinvest.database;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;

public class ConnectBase{


    public static void initDatabase() throws URISyntaxException, SQLException {
        URI dbUri = new URI("postgres://kvfviercdrwcct:c592a2faaf25a11c1641d252e7cd564c06e442480eca56cf083039b36e96d32f@ec2-54-243-239-66.compute-1.amazonaws.com:5432/d90u6fpjbk3aer");

        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

        Connection con = DriverManager.getConnection(dbUrl, username, password);
        java.util.Map map = con.getTypeMap();
        // put UDT into JDBC type map
        con.setTypeMap(map);
        con.close();
    }

    private static Connection getConnection() throws URISyntaxException, SQLException {
        URI dbUri = new URI("postgres://kvfviercdrwcct:c592a2faaf25a11c1641d252e7cd564c06e442480eca56cf083039b36e96d32f@ec2-54-243-239-66.compute-1.amazonaws.com:5432/d90u6fpjbk3aer");

        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

        return DriverManager.getConnection(dbUrl, username, password);
    }

    private static ResultSet queryQuery(String query, boolean who) throws URISyntaxException, SQLException{
        Connection con = getConnection();
        Statement stmt = con.createStatement();
        if(who) {
            ResultSet rs = stmt.executeQuery(query);
            con.close();
            return rs;
        }else{
            stmt.executeUpdate(query);
            con.close();
            return null;
        }
    }

    public static ResultSet selectQuery(String query){
        ResultSet rs = null;
        try {
            rs = queryQuery(query, true);
        }catch(SQLException e){
            System.out.println("SQL database wrong.");
        }catch(URISyntaxException e){
            e.printStackTrace();
        }finally{
            return rs;
        }
    }
    public static void runQuery(String query){
        try{
            queryQuery(query, false);
        }catch(SQLException e){
            System.out.println("SQL database wrong.");
        }catch(Exception e){
            System.out.println("URI is syntax wrong.");
        }finally{

        }
    }
}