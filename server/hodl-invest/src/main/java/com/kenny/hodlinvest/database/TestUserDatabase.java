package com.kenny.hodlinvest.database;

import com.kenny.hodlinvest.model.Cryptocoin;
import com.kenny.hodlinvest.model.Transaction;
import com.kenny.hodlinvest.model.User;
import com.kenny.hodlinvest.util.Secure;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("testDatabase")
public class TestUserDatabase implements UserDatabase {

    private final Map<String, User> database;

    public TestUserDatabase() {
        this.database = new HashMap<>();
        insertUser("zoro", new User("zoro", Secure.generateHash("fakepassword"),"kenny", "email@email.com", 1000, new ArrayList<>()));
        insertUser("ninja", new User("ninja", Secure.generateHash("testpassword"), "tyler", "lol@email.com", 2000, new ArrayList<>()));
        insertUser("summit1g", new User("summit1g", Secure.generateHash("lol123"), "josh", "summit@email.com", 1000, new ArrayList<>()));
        database.get("zoro").addTransaction(new Transaction(new Cryptocoin("btc", 6543), LocalDateTime.now()));
        database.get("zoro").addTransaction(new Transaction(new Cryptocoin("eth", 525), LocalDateTime.now()));

    }

    @Override
    public int insertUser(String username, User user) {
        database.put(username, user);
        return 1;
    }

    @Override
    public User selectUserByName(String username) {
        return database.get(username);
    }

    @Override
    public List<User> selectAllUsers() {
        return new ArrayList<>(database.values());
    }

    @Override
    public int updateUserByName(String username, User user) {
        database.put(username, user);

        return 1;
    }

    @Override
    public int deleteUserByName(String username) {
        database.remove(username);
        return 1;
    }

    @Override
    public int updateTransactions(String username, String ticker, double price) {
        database.get(username).addTransaction(new Transaction(new Cryptocoin(ticker, price), LocalDateTime.now()));
        return 1;
    }

    @Override
    public List<Transaction> selectAllTransactions(String username) {
        return database.get(username).getTransactions();
    }
}
