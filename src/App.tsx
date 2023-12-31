import "./App.css";
import { useGetUsers } from "./services/useGetUsers";
import { UsersList } from "./components/UsersList";

function App() {
  const {
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
  } = useGetUsers();

  return (
    <>
      <div className="App">
        <h1>Users List</h1>
        <header className="header">
          <button onClick={handleColor}>Color rows</button>

          <button onClick={handleSortByCountry}>
            {sortByCountry ? (
              <span>Not order by country</span>
            ) : (
              <span>Order by country</span>
            )}
          </button>
          <button onClick={handleReset}>Restore original users</button>
          <input
            value={filterByCountry}
            onChange={filteredUsers}
            type="text"
            placeholder="Search by country"
          />
        </header>

        <main className="main">
          <UsersList
            users={sortedUsers}
            color={color}
            deleteUser={handleDelete}
          />
        </main>
      </div>
    </>
  );
}

export default App;
