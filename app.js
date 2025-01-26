async function checkSession(){
    try {
        const {data , error} = await supabase.auth.getSession();
        const authPages = ["index.html" , "login.html" , ""]
        const currentPath = window.location.pathname
        const isauthPage = authPages.some((page) => page.includes(currentPath))
        const session = {data}
        if(session){
            if(isauthPage){
                window.location.href = "dashbord.html"
            }
        }
        else{
            if(!isauthPage){
                window.location.href = "login.html"
            }
        }
    } catch (error) {
        console.log(error)
    }
}

window.onload = checkSession;
