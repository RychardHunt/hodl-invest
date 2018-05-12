package com.kenny.hodlinvest;

import com.kenny.hodlinvest.database.ConnectBase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import java.sql.ResultSet;
import java.sql.SQLException;

import static junit.framework.TestCase.fail;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ConnectBaseTests {

    @Test
    public void contextLoads() {
        try {
            ConnectBase.initDatabase();
        }catch (Exception e){
            e.printStackTrace();
        }

//        ConnectBase.addNewUser("testConnectBase", "fakepassword", "alex", "alex@gmail.com", 0, 1000, 1, 2, 3, 4, 0);

//        ConnectBase.deleteUser("testConenctBase");

//        ConnectBase.addNewTransaction(3,"testConnectBase", -30,-2,-1,-1,-4,4000);

        ConnectBase.deleteAllTransactionByUser("testConnectBase");
        ResultSet rs = ConnectBase.selectQuery("SELECT * FROM users_info;");
        if(rs != null){
            try{
                while(rs.next()){
                    String st = rs.getString(1);
                    System.out.println(st + "------------------------------------------------------------");
                }
            }catch(SQLException e){
                e.printStackTrace();
                System.out.println("This is wrong, you are wrong, we are wrong");
                fail("Everything is wrong");
            }

        }



    }

}
