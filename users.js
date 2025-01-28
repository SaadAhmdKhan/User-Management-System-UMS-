let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let company = document.getElementById("company")
let address = document.getElementById("address")
let email = document.getElementById("email")
let AddUserBtn = document.getElementById("add-user-btn")
let userTableBody = document.getElementById("user_table_body")

async function addUser() {
    try {
        const { error } = await supabase
            .from("users")
            .insert({
                First_Name: firstName.value,
                Last_Name: lastName.value,
                Company: company.value,
                email: email.value,
                Adress: address.value,
            })
        if (error) throw error
        firstName.value = ""
        lastName.value = ""
        email.value = ""
        company.value = ""
        address.value = ""
        Swal.fire({
            title: "User Added",
            text: "User Sucesfully Added in the System",
            icon: "success",
        });
        userTableBody.innerHTML = ""
        getUsers();
    } catch (error) {
        console.log(error)
    }
}

async function getUsers() {
    try {
        const { data, error } = await supabase.from("users").select();
        if (error) throw error

        userTableBody.innerHTML = ''

        if (data) {
            data.map((val, index) => {
                return (userTableBody.innerHTML += `
                <tr>
                <td scope="col">${val.First_Name}</td>
                <td scope="col">${val.Last_Name}</td>
                <td scope="col">${val.Company}</td>
                <td scope="col">${val.email}</td>
                <td scope="col">${val.Adress}</td>
                <td> <span> <i id="delete_user" onclick="deluser(${val.id})" class="fa-solid fa-trash"></i> </span> </td>
              </tr>
                `
                )
            })
        }

    } catch (error) {
        console.log(error)
    }
}

async function deluser(userId) {
    try {
        Swal.fire({
            title: "Are you sure want to delete the user",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data, error } = await supabase
                    .from("users")
                    .delete()
                    .eq("id", userId)
                    .select()
                if (error) throw error
                if (data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'User Deleted Succesfully '
                    })

                    getUsers()
                }

            }
        })
    } catch (error) {
        console.log(error)
    }
}

let deleteBtn = document.getElementById("delete_user")

if(deleteBtn){
    deleteBtn.addEventListener("Click" , function(){
        let deleteUserId = localStorage.getItem("deleteUserId")
        console.log(deleteUserId)
    })
}

if(AddUserBtn){
    AddUserBtn.addEventListener('click' , addUser)
}

window.onload = getUsers();
window.deluser = deluser;