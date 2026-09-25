const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

async function registerUser() {

    try {

        const nome = document.getElementById("nome").value.trim();
        const cognome = document.getElementById("cognome").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confermaPassword = document.getElementById("conferma-password").value;
        const termini = document.getElementById("termini").checked;

        if (!nome || !cognome || !email || !password || !confermaPassword) {
            alert("Compila tutti i campi.");
            return;
        }

        if (password !== confermaPassword) {
            alert("Le password non coincidono.");
            return;
        }

        if (!termini) {
            alert("Devi accettare termini e privacy.");
            return;
        }

        alert("Sto creando il tuo account...");

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    nome: nome,
                    cognome: cognome
                }
            }
        });

        if (error) {
            alert("Errore Supabase: " + error.message);
            console.error(error);
            return;
        }

        console.log("Registrazione completata:", data);

        alert("Account creato! Controlla la tua email per confermare l'account.");

    } catch (error) {

        console.error(error);
        alert("Errore inatteso: " + error.message);

    }
}
