class Mail {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  filterStr(str, input) {
    const filteredStr = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (filteredStr === "") {
      this.errors.push(`🔴 Champ '${input}' invalide ou manquant`);
    } else {
      return filteredStr;
    }
  }

  verifyEmail(email) {
    const filteredEmail = email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (!filteredEmail.includes("@")) {
      this.errors.push(`🔴 Champ 'Adresse email' invalide ou manquant`);
    } else {
      return filteredEmail;
    }
  }

  validateData() {
    const filteredData = {
      first_name: this.filterStr(this.data.get("first_name"), "Prénom"),
      name: this.filterStr(this.data.get("name"), "Nom"),
      company: this.filterStr(this.data.get("company"), "Nom de la société"),
      activity: this.filterStr(this.data.get("activity"), "Domaine d'activité"),
      email: this.verifyEmail(this.data.get("email")),
      tel: this.filterStr(this.data.get("tel"), "Téléphone"),
      message: this.filterStr(this.data.get("message"), "Message"),
    };

    if (
      this.data.get("status") == "Renseignement" ||
      this.data.get("status") == "Problème technique" ||
      this.data.get("status") == "Partenariat" ||
      this.data.get("status") == "Candidature"
    ) {
      filteredData.status = this.data.get("status");
    } else {
      this.errors.push(`🔴 Champ 'Statut du message' invalide ou manquant`);
    }

    if (
      this.data.get("place") == "Île-de-France" ||
      this.data.get("place") == "Centre-Val de Loire" ||
      this.data.get("place") == "Bourgogne-Franche-Comté" ||
      this.data.get("place") == "Normandie" ||
      this.data.get("place") == "Hauts-de-France" ||
      this.data.get("place") == "Grand Est" ||
      this.data.get("place") == "Pays de la Loire" ||
      this.data.get("place") == "Normandie" ||
      this.data.get("place") == "Bretagne" ||
      this.data.get("place") == "Nouvelle-Aquitaine" ||
      this.data.get("place") == "Auvergne-Rhône-Alpes" ||
      this.data.get("place") == "Provence-Alpes-Côte d'Azur" ||
      this.data.get("place") == "Corse" ||
      this.data.get("place") == "Guadeloupe" ||
      this.data.get("place") == "Martinique" ||
      this.data.get("place") == "Guyane" ||
      this.data.get("place") == "La Réunion" ||
      this.data.get("place") == "Mayotte"
    ) {
      filteredData.place = this.data.get("place");
    } else {
      this.errors.push(`🔴 Champ 'Lieu d'intervention' invalide ou manquant`);
    }

    return filteredData;
  }

  send() {
    const validatedData = this.validateData();
    if (this.errors.length == 0) {
      const mailToLink = `
            mailto:paolo.debaisieux@gmail.com?subject=${encodeURIComponent(
              `Audit Process - ${validatedData.status}`
            )}&body=${encodeURIComponent(`
            - Envoyé par : ${validatedData.first_name} ${validatedData.name}
            - Adresse email : <i>${validatedData.email}</i>
            - Numéro de téléphone : <b>${validatedData.tel}</b>
            - Société : ${validatedData.company}
            - Domaine d'activité : ${validatedData.activity}
            - Lieu de l'intervention : ${validatedData.place}
        
            <h2>${validatedData.status}</h2>
        
            ${validatedData.message}
          `)}`;

      window.location.href = mailToLink;
    } else {
      alert(`${this.errors.join("\n\n")}`);
    }
  }
}
