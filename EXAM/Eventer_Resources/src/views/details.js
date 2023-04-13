import { html } from '../../node_modules/lit-html/lit-html.js';
import { apply, getApplications, getUserApplication } from '../data/applications.js';
import { deleteOffer, getById } from '../data/offers.js';
import { getUserData } from '../util.js';


const detailsTemplate = (offer, onDelete, onApply) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1" />
            <p id="details-title">${offer.name}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${offer.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span
                  >${offer.description}</span>
              </div>

            </div>

            <h3>Going: <span id="go">${offer.applications}</span> times.</h3>

            ${offer.canEdit || offer.canApply ? html`
            <div id="action-buttons">
          ${offer.canEdit ? html`
          <a href="/catalog/${offer._id}/edit" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
          ` : null}
          ${offer.canApply ? html`
          <a @click=${onApply} href="javascript:void(0)" id="go-btn">Going</a>
        ` : null}
          </div>`: null}
          </div>
        </section>
    `;

export async function detailsPage(ctx) {
  const id = ctx.params.id;

  const requests = [
    getById(id),
    getApplications(id)
  ]

  const userData = getUserData();

  if (userData) {
    requests.push(getUserApplication(id, userData._id));
  }

  const [offer, applications, hasApplied] = await Promise.all(requests);
  offer.applications = applications;

  if (userData) {
    offer.canEdit = userData._id == offer._ownerId;
    offer.canApply = offer.canEdit == false && hasApplied == 0;
  }

  update();

  function update() {
    ctx.render(detailsTemplate(offer, onDelete, onApply));
  }

  async function onDelete() {
    const choice = confirm('are you sure?');

    if (choice) {
      await deleteOffer(id);
      ctx.page.redirect('/catalog');
    }
  }

  async function onApply() {
    await apply(id);
    offer.applications++;
    offer.canApply = false;
    update();
  }
}