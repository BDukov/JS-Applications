import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, updateOffer } from '../data/offers.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (offer, onEdit) => html`
         <section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input type="text" name="name" .value=${offer.name} id="name" placeholder="Event"/>
              <input type="text" name="imageUrl" .value=${offer.imageUrl} id="event-image" placeholder="Event Image"/>
              <input type="text" name="category" .value=${offer.category} id="event-category" placeholder="Category"/>
              <textarea id="event-description" name="description" .value=${offer.description} placeholder="Description" rows="5" cols="50"></textarea> 
              <label for="date-and-time">Event Time:</label>
              <input type="text" name="date" .value=${offer.date} id="date" placeholder="When?"/>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
    `;

export async function editPage(ctx) {
  
  const id = ctx.params.id;

  const offer = await getById(id);
    ctx.render(editTemplate(offer, createSubmitHandler(onEdit)));

    async function onEdit({ name, imageUrl, category, description, date }) {

      if ([name, imageUrl, category, description, date].some(x => x == '')) {
        return alert('All fields are required!');
      } 
      
          await updateOffer(id, { name, imageUrl, category, description, date });
  
          ctx.page.redirect('/catalog/' + id);
    }
}