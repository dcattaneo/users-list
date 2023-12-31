import {type User} from './../types'

interface Props {
    users: User[],
    color: boolean,
    deleteUser: (email: string)=> void,
    
}

export function UsersList ({users, color, deleteUser} : Props) {

    return(
        <table width= '100%'>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Country</th>
                    <th>Actions</th>
                </tr>   

            </thead>

            <tbody>
                {users.map((user, index)=> {
                    const rowsBackgroundColor = index % 2 === 0 ? '#3e71be' : '#828080'
                    const backgroundColor = color ? rowsBackgroundColor : 'transparent'
                    
                    return(
                        <tr style={{backgroundColor: backgroundColor}} key={user.email}>
                            <td> <img src={user.picture.thumbnail}/> </td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            
                            <td> <button className="delete-button" onClick={()=> deleteUser(user.email)}>Delete</button></td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    );

}