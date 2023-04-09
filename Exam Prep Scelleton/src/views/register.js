import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';
 
//TODO Replace with actual view
const homeTemplate = (onRegister) => html`
<h1>Register Page</h1>
<form @submit=${onLRegister}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat: <input type="repass" name="repass"></label>
    <button>Register</button>  
</form>`;

export function registerPage(ctx){
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    //TODO change user object based on requirements
    async function onRegister({email, password, repass}, form){
        if(email == ''|| password == ''){
            return alert('All fields are required!');
        }
        if (password != repass) {
            return alert('Passwords don\'t match!');
        } 
        
        await register(email, password);
        form.reset();
        //TODO use redirect location from requirements
        ctx.page.redirect('/');
    }
}