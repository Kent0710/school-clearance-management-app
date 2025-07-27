const AdminPage = () => {
    

    return (
        <div>
            <h1 className="text-xl font-bold"> Welcome to your Admin Dashboard! </h1>
            <p className="text-sm font-semibold text-muted-foreground">
                Open the office(s) where you are an admin to manage that office.
            </p>


        </div>
    )
};

export default AdminPage;

const AdminOffices = () => {
    return (
        <li>
            admin office
        </li>
    )
}