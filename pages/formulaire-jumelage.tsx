import React, { useState } from 'react';
import Layout from '../src/app/components/Layout'; // Assurez-vous que le chemin vers votre composant Layout est correct

const styles = {
  container: {
    fontFamily: 'Roboto, sans-serif',
    margin: '20px auto',
    maxWidth: '800px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '700px',
    height: 'auto',
    display: 'block',
    margin: '0 auto 20px',
  },
  form: {
    display: 'grid',
    gap: '20px',
  },
  fieldset: {
    border: 'none',
    padding: '0',
    margin: '0',
  },
  legend: {
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '1.1em',
    color: '#555',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '1em',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    outline: 'none',
  },
  textarea: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '1em',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    resize: 'vertical',
    outline: 'none',
  },
  select: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '1em',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    outline: 'none',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: 'rgba(229, 7, 73, 1)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '10px',
  },
  buttonHover: {
    backgroundColor: '#b3053d',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const airtableEndpoint = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_AIRTABLE_TABLE_NAME}`;
    const airtableApiKey = process.env.REACT_APP_AIRTABLE_API_KEY || '';


    const headers = {
      'Authorization': `Bearer ${airtableApiKey}`,
      'Content-Type': 'application/json',
    };

    const data = {
      fields: {
        'Nom': formData.nom,
        'Fonction': formData.fonction,
        'Email': formData.email,
        'Nom de l\'école': formData.ecoleNom,
        'Adresse de l’école': formData.adresseEcole,
        'Ville': formData.ville,
        'Code postal': formData.codePostal,
        'Pays': formData.pays,
        'Site web': formData.siteWeb,
        'Type d’établissement': formData.typeEtablissement,
        'LabelFrancÉducation': formData.labelFrancEducation,
        'Sections bilingues': formData.sectionsBilingues.join(', '),
        'Niveau de la classe': formData.descriptionClasse.niveau,
        'Nombre d’élèves': formData.descriptionClasse.nombreEleves,
        'Niveau de français des élèves': formData.descriptionClasse.niveauFrancais,
        'Matières enseignées': formData.matieresEnseignees.join(', '),
        'Autres caractéristiques de la classe': formData.descriptionClasse.autresCaracteristiques,
        'Thèmes d’échanges': formData.themesEchanges,
        'Durée du projet': formData.dureeProjet,
        'Date de début du projet': formData.dateDebut,
        'Description du projet': formData.descriptionProjet,
      }
    };

    try {
      const response = await fetch(airtableEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Data sent to Airtable:', result);

      // Envoyer une notification à Teams
      const teamsWebhookUrl = 'YOUR_TEAMS_WEBHOOK_URL';
      const teamsMessage = {
        text: `Un nouveau questionnaire a été soumis : Nom - ${formData.nom}, E-mail - ${formData.email}`,
      };

      await fetch(teamsWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamsMessage),
      });

      alert('Formulaire soumis avec succès!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b3053d')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(229, 7, 73, 1)')}
          >
            Envoyer
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default QuestionnaireJumelage;
