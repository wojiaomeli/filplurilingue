import React, { useState } from 'react';
import Layout from '../src/app/components/Layout'; // Assurez-vous que le chemin vers votre composant Layout est correct

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  image: {
    width: '800px', // Augmenter la taille de l'image
    height: 'auto',
    marginBottom: '20px',
    display: 'block', // Centrer l'image
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  form: {
    display: 'grid',
    gap: '25px', // Espacer les questions
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'left',
  },
  fieldset: {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '5px',
  },
  legend: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px', // Ajouter de l'espace sous chaque question
  },
  input: {
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '80%', // Réduire la largeur
  },
  textarea: {
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
    width: '80%', // Réduire la largeur
  },
  select: {
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '80%', // Réduire la largeur
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'rgba(3, 112, 225, 1)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    marginTop: '15px',
  },
  buttonHover: {
    backgroundColor: 'rgba(3, 112, 225, 0.8)',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  asterisk: {
    color: 'red',
  },
};

const QuestionnaireJumelage: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    fonction: '',
    email: '',
    ecoleNom: '',
    adresseEcole: '',
    ville: '',
    codePostal: '',
    pays: '',
    siteWeb: '',
    typeEtablissement: '',
    labelFrancEducation: '',
    sectionsBilingues: [] as string[],
    matieresEnseignees: [] as string[],
    descriptionClasse: {
      niveau: '',
      nombreEleves: '',
      niveauFrancais: '',
      matieres: '',
      autresCaracteristiques: '',
    },
    caracteristiquesPartenaire: {
      niveau: '',
      nombreEleves: '',
      matieres: '',
      autresCaracteristiques: '',
    },
    themesEchanges: '',
    dureeProjet: '',
    dateDebut: '',
    descriptionProjet: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFormData({ ...formData, [e.target.name]: selectedValues });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedMatieres = checked
      ? [...formData.matieresEnseignees, value]
      : formData.matieresEnseignees.filter(matiere => matiere !== value);
    setFormData({ ...formData, matieresEnseignees: updatedMatieres });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Vous pouvez ajouter ici le code pour envoyer les données à un serveur ou les traiter
    console.log(formData);
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Questionnaire Jumelages Scolaires</h1>
        <img 
          src="/assets/infographie-jumelage.png"
          alt="Infographie Jumelage"
          style={styles.image}
        />
        <form onSubmit={handleSubmit} style={styles.form}>
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>1. À propos de vous et votre école</legend>

            <label style={styles.label}>
              <strong>1.1. Votre nom <span style={styles.asterisk}>*</span></strong>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>1.2. Votre fonction <span style={styles.asterisk}>*</span></strong>
              <input
                type="text"
                name="fonction"
                value={formData.fonction}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>1.3. Votre adresse e-mail <span style={styles.asterisk}>*</span></strong>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>1.4. Nom de l'école <span style={styles.asterisk}>*</span></strong>
              <input
                type="text"
                name="ecoleNom"
                value={formData.ecoleNom}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>1.5. Adresse de l’école <span style={styles.asterisk}>*</span></strong>
              <input
                type="text"
                name="adresseEcole"
                value={formData.adresseEcole}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>1.6. Ville <span style={styles.asterisk}>*</span></strong>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>1.7. Code postal <span style={styles.asterisk}>*</span></strong>
              <input
                type="text"
                name="codePostal"
                value={formData.codePostal}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>1.8. Pays <span style={styles.asterisk}>*</span></strong>
              <input
                type="text"
                name="pays"
                value={formData.pays}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>1.9. Site web de l’école</strong>
              <input
                type="url"
                name="siteWeb"
                value={formData.siteWeb}
                onChange={handleChange}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              <strong>1.10. Type d’établissement <span style={styles.asterisk}>*</span></strong>
              <select
                name="typeEtablissement"
                value={formData.typeEtablissement}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">- Sélectionner -</option>
                <option value="Public">Public</option>
                <option value="Privé">Privé</option>
                <option value="Autre">Autre</option>
              </select>
            </label>

            <label style={styles.label}>
              <strong>1.11. LabelFrancÉducation</strong>
              <select
                name="labelFrancEducation"
                value={formData.labelFrancEducation}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">- Sélectionner -</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </label>

            <label style={styles.label}>
              <strong>1.12. Sections bilingues</strong>
              <select
                name="sectionsBilingues"
                multiple
                value={formData.sectionsBilingues}
                onChange={handleMultiSelectChange}
                style={styles.select}
              >
                <option value="Section européenne">Section européenne</option>
                <option value="Section orientale">Section orientale</option>
                <option value="Autre">Autre</option>
              </select>
            </label>

          </fieldset>

          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>2. À propos de votre classe</legend>

            <label style={styles.label}>
              <strong>2.1. Niveau de la classe <span style={styles.asterisk}>*</span></strong>
              <input
                type="text"
                name="descriptionClasse.niveau"
                value={formData.descriptionClasse.niveau}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>2.2. Nombre d’élèves <span style={styles.asterisk}>*</span></strong>
              <input
                type="number"
                name="descriptionClasse.nombreEleves"
                value={formData.descriptionClasse.nombreEleves}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>2.3. Niveau de français des élèves <span style={styles.asterisk}>*</span></strong>
              <input
                type="text"
                name="descriptionClasse.niveauFrancais"
                value={formData.descriptionClasse.niveauFrancais}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>2.4. Matières enseignées</strong>
              <div style={styles.checkboxContainer}>
                <label>
                  <input
                    type="checkbox"
                    name="matieresEnseignees"
                    value="Français"
                    onChange={handleCheckboxChange}
                  />
                  Français
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="matieresEnseignees"
                    value="Mathématiques"
                    onChange={handleCheckboxChange}
                  />
                  Mathématiques
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="matieresEnseignees"
                    value="Histoire"
                    onChange={handleCheckboxChange}
                  />
                  Histoire
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="matieresEnseignees"
                    value="Autre"
                    onChange={handleCheckboxChange}
                  />
                  Autre
                </label>
              </div>
            </label>

            <label style={styles.label}>
              <strong>2.5. Autres caractéristiques de la classe</strong>
              <textarea
                name="descriptionClasse.autresCaracteristiques"
                value={formData.descriptionClasse.autresCaracteristiques}
                onChange={handleChange}
                style={styles.textarea}
              />
            </label>

          </fieldset>

          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>3. Votre projet de jumelage</legend>

            <label style={styles.label}>
              <strong>3.1. Thèmes d’échanges <span style={styles.asterisk}>*</span></strong>
              <textarea
                name="themesEchanges"
                value={formData.themesEchanges}
                onChange={handleChange}
                style={styles.textarea}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>3.2. Durée du projet <span style={styles.asterisk}>*</span></strong>
              <input
                type="text"
                name="dureeProjet"
                value={formData.dureeProjet}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              <strong>3.3. Date de début du projet</strong>
              <input
                type="date"
                name="dateDebut"
                value={formData.dateDebut}
                onChange={handleChange}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              <strong>3.4. Description du projet <span style={styles.asterisk}>*</span></strong>
              <textarea
                name="descriptionProjet"
                value={formData.descriptionProjet}
                onChange={handleChange}
                style={styles.textarea}
                required
              />
            </label>

          </fieldset>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(3, 112, 225, 0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(3, 112, 225, 1)')}
          >
            Envoyer
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default QuestionnaireJumelage;
