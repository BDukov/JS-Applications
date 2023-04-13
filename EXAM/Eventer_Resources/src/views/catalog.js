import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllOffers } from '../data/offers.js';

const catalogTemplate = (offers) => html`
       <h2>Current Events</h2>
       <section id="dashboard">
       ${offers.length > 0 ? offers.map(offerCard) : html`
       <h4>No Events yet.</h4>`}
       `;

const offerCard = (offer) => html`
         <div class="event">
                  <img src=${offer.imageUrl} alt="example1" />
                  <p class="title">${offer.name}</p>
                  <p class="date">${offer.date}</p>
                  <a class="details-btn" href="/catalog/${offer._id}">Details</a>
                </div>`;


export async function catalogPage(ctx) {
  const offers = await getAllOffers();
  ctx.render(catalogTemplate(offers));
}