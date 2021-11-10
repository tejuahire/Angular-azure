package com.atyeti.tradingApp.repository;

import com.atyeti.tradingApp.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel,String> {

    UserModel findByEmail(String email);
}
