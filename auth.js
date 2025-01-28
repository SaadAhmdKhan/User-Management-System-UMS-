let signupEmail = document.getElementById("signup_email")
let signupPass =  document.getElementById("signup_password")
let signupBtn = document.getElementById("signup-btn")
let signupBtnLoader = document.getElementById("loading_btn_spinner")
let loginEmail = document.getElementById("login_email")
let loginPass = document.getElementById("login_password")
let loginBtn = document.getElementById("login_btn")
let sessionBtn = document.getElementById("session_btn")
let logoutBtn = document.getElementById("logout_btn")

async function signUp(){
    try {
        signupBtnLoader.style.display = 'block'
        const {data , error} = await supabase.auth.signUp({
            email: signupEmail.value,
            password: signupPass.value,
        })
        if(error) throw error
        if(data){
            alert("Please Check Your Email For Confirmation")
            // if(email.isConfirmed){
            //     setTimeout(function () {
            //         window.location.href = 'login.html'
            // }, 2000);
            // }
        }
        return data
    } catch (error) {
        console.log(error)
    }
    finally{
        signupBtnLoader.style.display = 'none' 
    }
}

async function login(){
    try {
        const { data , error } = await supabase.auth.signInWithPassword({
            email: loginEmail.value,
            password: loginPass.value,
        })

        if(error) throw error
        if(data){
            console.log(data)
            Swal.fire({
                title: "Login Succesfully",
                icon: "success",
            }); 
            setTimeout(function () {
                window.location.href = "dashbord.html";
            }, 2000);
        }
        return data
        } catch (error) {
        console.log(error)
        alert(error.message)
    }
}

async function checkSession(){
    try {
        const { data, error } = await supabase.auth.GettSession()
        if(data) {
            console.log(data)
        } 
        if(error) throw error
    } catch (error) {
        console.log(error)
    }
}

async function logOut(){
    try {
        const {error} = await supabase.auth.signOut()
        if(error) throw error
        window.location.href = '/login.html'
    } catch (error) {
        console.log(error)
    }
}

if(sessionBtn){
    sessionBtn.addEventListener("click" , checkSession)
}

if(loginBtn){
    loginBtn.addEventListener("click" , login)
}

if(logoutBtn){
    logoutBtn.addEventListener("click" , logOut)
}

if(signupBtn){
    signupBtn.addEventListener("click" , signUp)
}