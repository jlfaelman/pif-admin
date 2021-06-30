function logout() {
    window.sessionStorage.removeItem("ID");
    window.location.href = "/";
}


function search(){
    
}
async function login() {
    const user = document.getElementById('admin-user')
    const password = document.getElementById('admin-password')
    try {
        if (user.value == '' || password.value == '') {
            document.getElementById("login-err").removeAttribute('hidden');
            document.getElementById("login-txt").innerText = "Textfields cannot be Empty";
        } else {
            const credentials = {
                user: user.value,
                password: password.value
            }
            const login = await fetch('http://localhost:5000/admin/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(credentials)
                });
            const result = await login.json();
            if(result.body[0]){
                window.sessionStorage.setItem('ID', result.body[0].Admin_ID);
                window.location.href = '/dashboard'
            }
        }
    } catch (e) {
        console.error(e)
    }
}



async function setStatus(id){
    try {
        const status = document.getElementById('page-status')
        const body = {
            id:id,
            status: status.value,
        }
        const setStatus = await fetch('http://localhost:5000/admin/status',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            });
        const result = await setStatus.json();
        window.location.href = `/fundraisers/page?id=${id}&success=1`;

    } catch (e) {
        console.error(e)
    }
}
function dismiss() {
    document.getElementById('donate-success').setAttribute('hidden', 'true');
}
function init(){
    const pathArray = window.location.pathname.split('/');
    const nav = document.getElementById('navbar-main');
    const side = document.getElementById('sidenav');

        






    if (pathArray[1] == '' ) {
        nav.setAttribute('hidden','true')
        side.setAttribute('hidden','true')
    } else {
        side.removeAttribute('hidden')
        nav.removeAttribute('hidden')
    }
}
init();