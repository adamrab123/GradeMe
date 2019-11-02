<?php


class User {
    public $username;
    public $password;

    function __construct($id, $username) {
        if (gettype($username) !== 'string') {
            throw new Exception('username must be a string');
        }
        if (gettype($password) !== 'string') {
            throw new Exception('password must be a string');
        }
        $this->username = $username;
        $this->password = $password;
    }
}