import { useState, useMemo, useEffect, useRef, ChangeEvent } from "react";
import { type User } from "./../types";

export function useGetUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [color, setColor] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const [filterByCountry, setFilterByCountry] = useState<string>("");
  const originalUsers = useRef<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((data) => {
        const { results } = data;

        setUsers(results);
        originalUsers.current = results;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleColor = () => {
    setColor((prevState) => !prevState);
  };

  const handleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState);
  };

  const handleDelete = (currentEmail: string) => {
    const filteredUsers = users.filter((user) => {
      return user.email !== currentEmail;
    });
    setUsers(filteredUsers);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const filteredUsers = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterByCountry(e.target.value);
  };

  const newUsers = useMemo(() => {
    return filterByCountry !== null && filterByCountry.length > 0 
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterByCountry.toLowerCase());
        })
      : users;
  }, [users, filterByCountry]);

  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? [...newUsers].sort((a, b) => {
          return a.location.country.localeCompare(b.location.country);
        })
      : newUsers;
  }, [newUsers, sortByCountry]);

  return {
    users,
    color,
    handleColor,
    sortByCountry,
    handleSortByCountry,
    sortedUsers,
    newUsers,
    handleDelete,
    handleReset,
    filterByCountry,
    filteredUsers,
  };
}
