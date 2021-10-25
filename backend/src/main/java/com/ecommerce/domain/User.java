package com.ecommerce.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@Entity
public class User {

    @Id
    private String id;
    
    @Column(name = "pw")
    private String pw;
    
    @Column(name = "student_id")
    private String studentid;
    
    @Column(name = "role")
    private String role;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "campus")
    private String campus;
    
    public List<String> getRoleList(){
        if(this.role.length() > 0){
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }
    
   
    
}
