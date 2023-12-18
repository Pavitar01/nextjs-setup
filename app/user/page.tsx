"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { addUser, getUser } from "../lib/services/user.services";
import { QueryClient } from "@tanstack/react-query"
interface User {
  username: string;
  email: string;
  password: string;
}
const queryClient = new QueryClient()

const Userdata = () => {
  // const [userData, setUserData] = useState<User[]>([]);
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: ""
  })

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:8080/user");
  //       setUserData(data); // Set the fetched data to the state
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   getUser();
  // }, []);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userData"],//[ "üserData",user]
    queryFn: getUser,//()=>getUser(user)
    staleTime: 5000,
    // refetchOnWindowFocus: true,
    // refetchOnMount: true
  })

  const { mutateAsync: addUserMutation } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] })
    }
  })
  return (
    <>
      <input type="text" onChange={(e) => {
        setUser({ ...user, name: e.target.value })
      }} />
      <input type="username" onChange={(e) => {
        setUser({ ...user, username: e.target.value })

      }} />
      <input type="password" onChange={(e) => {
        setUser({ ...user, password: e.target.value })

      }} />

      <button onClick={async () => {
        try {
          addUserMutation(user)
        } catch (err) {
          console.log(err)
        }
      }}>Add user</button>

      {isLoading ? "loading" :
        data.map((i: User, index: number) => (
          <>
            <h1 key={index}>
              <span>{i.email}</span>
              <br />
              <span>{i.password}</span>
              <br />
              <span>{i.username}</span>
            </h1>
            <button onClick={() => refetch()}>refetch</button>
          </>
        ))}
    </>
  );
};

export default Userdata;
