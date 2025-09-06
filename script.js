// Modern ES6+ JavaScript for Steamy Dumplings
class SteamyDumplingsApp {
initFeatureRequests() {
    // 🔒 Check if username exists in localStorage
    let currentUser = localStorage.getItem("username");
    if (!currentUser) {
        let username = prompt("Enter your name (you won’t be able to change it later):");
        if (!username) {
            alert("⚠️ You must enter a name!");
            location.reload();
        } else {
            let confirmUsername = confirm(`Are you sure? You won't be able to change it later!`);
            if (confirmUsername) {
                localStorage.setItem("username", username);
                currentUser = username;
            } else {
                location.reload();
            }
        }
    }
    console.log("✅ Logged in as:", currentUser);

    // Firebase Config (your same config)
    const firebaseConfig = {
        apiKey: "AIzaSyAlaCGseWSNF41sKqdS3_PqXABgpsKVVso",
        authDomain: "feature-requests-bf962.firebaseapp.com",
        projectId: "feature-requests-bf962",
        storageBucket: "feature-requests-bf962.appspot.com",
        messagingSenderId: "823579759336",
        appId: "1:823579759336:web:e2faf82c62751a906def5d"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    const submitButton = document.getElementById("submit-request");
    const featureInput = document.getElementById("feature-input");
    const featureList = document.getElementById("feature-list");
    const requestedFeaturesSection = document.getElementById("requested-features");

    if (!submitButton || !featureInput) return;

    // 📝 Submit New Feature Request
    submitButton.addEventListener("click", () => {
        const feature = featureInput.value.trim();
        if (feature) {
            db.collection("requests").add({
                text: feature,
                username: currentUser,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                featureInput.value = "";
            }).catch(error => {
                console.error("❌ Error adding request:", error);
            });
        } else {
            alert("⚠️ Please enter a feature request.");
        }
    });

    // Realtime updates
    db.collection("requests").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        requestedFeaturesSection.style.display = 'block';
        featureList.innerHTML = "";
        snapshot.forEach(doc => {
            const request = doc.data();
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${request.text} <em>- ${request.username}</em></span>
            `;

            // Delete button if owner or admin
            if (currentUser === request.username || currentUser === "PookieGPT") {
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌ Delete";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.addEventListener("click", () => {
                    db.collection("requests").doc(doc.id).delete().catch(console.error);
                });
                li.appendChild(deleteBtn);
            }
            featureList.appendChild(li);
        });
    });
}

    constructor() {
        this.games = new Map();
        this.filteredGames = new Map();
        this.currentView = 'grid';
        this.currentSort = 'name-asc';
        this.searchQuery = '';
        this.favorites = new Set(JSON.parse(localStorage.getItem('favorites') || '[]'));
        
        this.init();
    }

    async init() {
        try {
            console.log('Steamy Dumplings: Initializing app...');
            this.showLoading();
            await this.loadGames();
            console.log('Steamy Dumplings: Games loaded:', this.games.size);
            this.setupEventListeners();
            console.log('Steamy Dumplings: Event listeners set up');
            this.updateStats();
            this.renderGames();
            this.initFeatureRequests();
            this.hideLoading();
            this.showToast('Welcome to Steamy Dumplings!', 'success');
            console.log('Steamy Dumplings: App initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showToast('Failed to load games. Please refresh the page.', 'error');
            this.hideLoading();
        }
    }

// Sample game data (replace with actual Steam API calls)
    async loadGames() {
        const gamesData = {
    "14147": { name: "Steep", link: "https://www.mediafire.com/file/6p8599pzpjbu499/(PASS+-+14147)+Steep+Fix.rar/file" },
    "400": { name: "Portal", link: "https://www.mediafire.com/file/laqge4o2cu0hgvj/400+-+Portal.zip/file" },
    "440": { name: "Team Fortress 2", link: "https://www.mediafire.com/file/ahremtkex9ca5iv/440+-+Team+Fortress+2.zip/file" },
    "21100": { name: "F.E.A.R. 3", link: "https://www.mediafire.com/file/kiiuofgitw13853/21100+-+F.E.A.R.+3.rar/file" },
    "55110": { name: "Red Faction Armageddon", link: "https://www.mediafire.com/file/8wduki8oj1qxnn1/55110+-+Red+Faction+Armageddon.rar/file" },
    "115320": { name: "PROTOTYPE 2", link: "https://www.mediafire.com/file/0gc31sbfabu7t2l/115320+-+PROTOTYPE+2.zip/file" },
    "203750": { name: "Binary Domain", link: "https://www.mediafire.com/file/fhjlbrdny2ny5kq/203750+-+Binary+Domain+-+Testado+e+OK.rar/file" },
    "213330": { name: "LEGO® Batman™ 2 DC Super Heroes", link: "https://www.mediafire.com/file/55p7ox3o5hy8goa/213330+-+LEGO®+Batman™+2+DC+Super+Heroes.zip/file" },
    "222480": { name: "Resident Evil Revelations", link: "https://www.mediafire.com/file/nozoblmym484d0t/222480+-+Resident+Evil+Revelations.zip/file" },
    "223850": { name: "3DMark", link: "https://www.mediafire.com/file/44x4gpfo99ygeur/223850+-+3DMark.zip/file" },
    "227300": { name: "Euro Truck Simulator 2 +98 Dlcs", link: "https://www.mediafire.com/file/rol553oupdiwnkb/227300+-+Euro+Truck+Simulator+2++98+Dlcs.zip/file" },
    "242550": { name: "Rayman® Legends", link: "https://www.mediafire.com/file/b5pltk0h4vs3b5p/242550+-+Rayman®+Legends.rar/file" },
    "244210": { name: "Assetto Corsa", link: "https://www.mediafire.com/file/zfd2cox82xu4tae/244210+-+Assetto+Corsa.zip/file" },
    "246620": { name: "Plague Inc Evolved", link: "https://www.mediafire.com/file/c24oa3kwruz1rxx/246620+-+Plague+Inc+Evolved.zip/file" },
    "268910": { name: "Cuphead + DLC The Delicious Last Course", link: "https://www.mediafire.com/file/0y51dvgsmktw12x/268910+-+Cuphead+++DLC+The+Delicious+Last+Course.rar/file" },
    "284160": { name: "BeamNG.drive", link: "https://www.mediafire.com/file/fj2n6zytktzwm8p/284160+-+BeamNG.drive.zip/file" },
    "371660": { name: "Far Cry® Primal + Bypass", link: "https://www.mediafire.com/file/d6qpuqvz7syylfy/371660+-+Far+Cry®+Primal+++Bypass+-+Testado+e+OK.zip/file" },
    "385730": { name: "WWE 2K16", link: "https://www.mediafire.com/file/j00ramlhps4le1t/385730+-+WWE+2K16.zip/file" },
    "431960": { name: "Wallpaper Engine", link: "https://www.mediafire.com/file/lv0ptpdn1pmn1hn/431960+-+Wallpaper+Engine.zip/file" },
    "447040": { name: "Watch Dogs 2", link: "https://www.mediafire.com/file/pbpuf5nft8ug6rr/447040+-+Watch+Dogs+2.zip/file" },
    "526870": { name: "Satisfactory", link: "https://www.mediafire.com/file/75l1vj1lqxbyazn/526870+-+Satisfactory.zip/file" },
    "546560": { name: "Half-Life Alyx", link: "https://www.mediafire.com/file/bry6wbq4ny0g4gv/546560+-+Half-Life+Alyx.zip/file" },
    "690830": { name: "Foundation", link: "https://www.mediafire.com/file/2y9urlxurlz11hq/690830+-+Foundation.zip/file" },
    "814380": { name: "Sekiro™ Shadows Die Twice - GOTY Edition", link: "https://www.mediafire.com/file/66qk0bvwm1mmonm/814380+-+Sekiro™+Shadows+Die+Twice+-+GOTY+Edition.zip/file" },
    "824270": { name: "Koovaks Aim Trainer", link: "https://www.mediafire.com/file/sdozhikqjg44q59/824270+-+koovaks+aim+trainer.zip/file" },
    "883710": { name: "Resident Evil 2 Remake", link: "https://www.mediafire.com/file/my97gghyt0jca8c/883710+-+Resident+Evil+2+Remake.zip/file" },
    "962400": { name: "Granny", link: "https://www.mediafire.com/file/4kahdbfjkn0hhtu/962400+-+Granny.zip/file" },
    "1114070": { name: "My Child Lebensborn", link: "https://www.mediafire.com/file/5vuh9f9rpjeyp4z/1114070+-+My+Child+Lebensborn.zip/file" },
    "1144200": { name: "Ready or Not", link: "https://www.mediafire.com/file/7vde8u175e33hg8/1144200+-+Ready+or+Not.zip/file" },
    "1211020": { name: "Wobbly Life", link: "https://www.mediafire.com/file/kjdmzvfw8zlbpkc/1211020+-+Wobbly+Life.zip/file" },
    "1245620": { name: "ELDEN RING", link: "https://www.mediafire.com/file/bufwwbphdc3whgv/1245620+-+ELDEN+RING.zip/file" },
    "1357870": { name: "Metel - Horror Escape", link: "https://www.mediafire.com/file/xckxedhikrcevgz/1357870+-+Metel+-+Horror+Escape.zip/file" },
    "1426210": { name: "It Takes Two", link: "https://www.mediafire.com/file/7wwxwibvtf5a4c2/1426210+-+It+Takes+Two.zip/file" },
    "1442430": { name: "Storage Hunter Simulator", link: "https://www.mediafire.com/file/36a3fcfw67ft5ce/1442430+-+Storage+Hunter+Simulator.zip/file" },
    "1659420": { name: "UNCHARTED™ Legacy of Thieves Collection", link: "https://www.mediafire.com/file/jvulml148xjuajq/1659420+-+UNCHARTED™+Legacy+of+Thieves+Collection.zip/file" },
    "1812620": { name: "DSX", link: "https://www.mediafire.com/file/lcakaqjw4sj854d/1812620+-+DSX.zip/file" },
    "1848450": { name: "Nightmare of Decay", link: "https://www.mediafire.com/file/40t8wqrajlswepm/1848450+-+Nightmare+of+Decay.zip/file" },
    "1888930": { name: "The Last of Us™ Part I", link: "https://www.mediafire.com/file/1kur16b70bht9qy/1888930+-+The+Last+of+Us™+Part+I.zip/file" },
    "1947500": { name: "The Walking Dead Saints & Sinners - Chapter 2 Retribution", link: "https://www.mediafire.com/file/xv0mik7vii9c46v/1947500+-+The+Walking+Dead+Saints+&+Sinners+-+Chapter+2+Retribution.zip/file" },
    "2012840": { name: "Portal with RTX", link: "https://www.mediafire.com/file/q48zoy9rl4a6h0x/2012840+-+Portal+with+RTX.zip/file" },
    "2050650": { name: "Resident Evil 4", link: "https://www.mediafire.com/file/4mfzzo0nz46v2o1/2050650+-+Resident+Evil+4.zip/file" },
    "2169200": { name: "Sniper Elite Resistance", link: "https://www.mediafire.com/file/8arso1wfuxbhrw6/2169200+-+Sniper+Elite+Resistance.zip/file" },
    "2233120": { name: "A Quiet Place The Road Ahead", link: "https://www.mediafire.com/file/adaf2o6ldfhops8/2233120+-+A+Quiet+Place+The+Road+Ahead.zip/file" },
    "2358720": { name: "Black Myth Wukong", link: "https://www.mediafire.com/file/xqfxlojsxcg11nh/2358720+-+Black+Myth+Wukong.zip/file" },
    "2379780": { name: "Balatro", link: "https://www.mediafire.com/file/aera8wk06ll5tz0/2379780+-+Balatro.zip/file" },
    "2536530": { name: "The Pony Factory", link: "https://www.mediafire.com/file/rbm3lp90uywl55n/2536530+-+The+Pony+Factory.zip/file" },
    "2634950": { name: "Tokyo Extreme Racer", link: "https://www.mediafire.com/file/46k0vh8ksf3zl0z/2634950+-+tokyo+extreme+racer.zip/file" },
    "2651280": { name: "Spider-Man 2", link: "https://www.mediafire.com/file/dhtl39i00g9kib7/2651280+-+Spider-Man+2.zip/file" },
    "2835570": { name: "Buckshot Roulette", link: "https://www.mediafire.com/file/b9djfxfnw4c8gyb/2835570+-+Buckshot+Roulette.zip/file" },
    "2842040": { name: "Star Wars Outlaws", link: "https://www.mediafire.com/file/abovcmri7v6jobx/2842040+-+Star+Wars+Outlaws.rar/file" },
    "3058630": { name: "Assetto Corsa Evo", link: "https://www.mediafire.com/file/xw9fe6n2yhi10p8/3058630+-+Asseto+Cora+Evo.zip/file" },
    "3292260": { name: "Amenti", link: "https://www.mediafire.com/file/uk4ac5ua96apdav/3292260+-+Amenti.zip/file" },
    "601050": { name: "Attack on Titan 2 - A.O.T.2", link: "https://www.mediafire.com/file/pdp3k9zd3phrs56/Attack+on+Titan+2+-+A.O.T.2+-+601050.zip/file" },
    "1091500": { name: "CyberPunk 2077", link: "https://www.mediafire.com/file/30fgdc6qw8ia35l/CyberPunk+2077.zip/file" },
    "2934180": { name: "Doraemon Dorayaki Shop Story", link: "https://www.mediafire.com/file/gimacj8mswftl7j/Doraemon+Dorayaki+Shop+Story+-+2934180.zip/file" },
    "2909400": { name: "Final Fantasy VII Rebirth", link: "https://www.mediafire.com/file/ybyufcm90ofc5kz/Final+Fantasy+VII+Rebirth+-+2909400.zip/file" },
    "732690": { name: "FIVE NIGHTS AT FREDDY'S HELP WANTED", link: "https://www.mediafire.com/file/5kacii61wgtei79/FIVE+NIGHTS+AT+FREDDY'S+HELP+WANTED+-+732690.zip/file" },
    "4000": { name: "Garry's Mod", link: "https://www.mediafire.com/file/k85s3tg6b2l55tq/Garry's+Mod.zip/file" },
    "1159690": { name: "Voidtrain", link: "https://www.mediafire.com/file/yexas8tfqy9w8a3/Voidtrain+-+1159690.zip/file" },
    "3198320": { name: "Willie's Nightfall", link: "https://www.mediafire.com/file/0dh3192g1qgfu7z/Willie's+Nightfall+-+3198320.zip/file" },
    "1086940": { name: "Baldur's Gate 3", link: "https://www.mediafire.com/file/c0psaol7hvi4jtl/1086940+-+Baldur's+Gate+3.zip/file" },
    "2916430": { name: "Fast Food Simulator", link: "https://www.mediafire.com/file/7ms257rmhuyrgd5/2916430+-+Fast+Food+Simulator.zip/file" },
    "1771300": { name: "KingdomCome Deliverance 2", link: "https://www.mediafire.com/file/s65zsb41yfj7s4y/1771300+-+KingdomCome+Deliverance+2.zip/file" },
    "1261040": { name: "Streamer Life Simulator", link: "https://www.mediafire.com/file/6upycoplanbmt5a/1261040+-+Streamer+Life+Sim.zip/file" },
    "1249970": { name: "Test Drive Unlimited Solar Crown", link: "https://www.mediafire.com/file/dsdnwdm0d1imcim/1249970+-+Test+Drive+Unlimited+Solar+Crown.zip/file" },
    "413150": { name: "Stardew Valley", link: "https://www.mediafire.com/file/dva0wg15373snnl/413150+-+Stardew+Valley.zip/file" },
    "236430": { name: "DarkSouls II", link: "https://www.mediafire.com/file/du4w996srg5ae2i/236430+-+DarkSouls+2.zip/file" },
    "3244220": { name: "A Game About Digging A Hole", link: "https://www.mediafire.com/file/yz2iu6d1xqyf59o/3244220+-+A+Game+About+Digging+A+Hole.zip/file" },
    "3205080": { name: "Bad Parenting 1 Mr.Red Face", link: "https://www.mediafire.com/file/yh6xl9gpt6w7djo/3205080+-+Bad+Parenting+1+Mr.+Red+Face.zip/file" },
    "1533390": { name: "Gorilla Tag", link: "https://www.mediafire.com/file/rif4ij1lvsr9qis/Gorilla+Tag+-+1533390+-+Updated.rar/file" },
    "2507610": { name: "The Quintessential Quintuplets - Memories of a Quintessential Summer", link: "https://www.mediafire.com/file/lvfgg2mregyr479/The+Quintessential+Quintuplets+-+Memories+of+a+Quintessential+Summer+-+2507610.zip/file" },
    "3008670": { name: "Poppy Playtime - Chapter 4", link: "https://www.mediafire.com/file/nryz738raap8r94/Poppy+Playtime+-+Chapter+4+-+3008670.7z/file" },
    "2890830": { name: "Streamer Life Sim 2", link: "https://www.mediafire.com/file/6q1jw60tme8phx0/Streamer+Life+Simulator+2+-+2890830.zip/file" },
    "424840": { name: "Little Nightmares", link: "https://www.mediafire.com/file/ztv530pumqghrcu/LN1.zip/file" },
    "2527500": { name: "Miside", link: "https://www.mediafire.com/file/yyx02n55lprtzvk/MiSide.zip/file" },
    "860510": { name: "Little Nightmares II", link: "https://www.mediafire.com/file/uz96a540wt3uadh/LN2.zip/file" },
    "914620": { name: "Mist Survival", link: "https://www.mediafire.com/file/8r76es2sbj7k319/Mist+Survival+-+914620.zip/file" },
    "322330": { name: "Don't Starve Together", link: "https://www.mediafire.com/file/7c5y07nrf4nwsip/322330+-+Don't+Starve+Together.zip/file" },
    "620": { name: "Portal 2", link: "https://www.mediafire.com/file/wijgr249vlih9p2/Portal+2.zip/file" },
    "2215430": { name: "Ghost of Tsushima DIRECTOR'S CUT", link: "https://www.mediafire.com/file/7nhslfkjptn5nvj/Ghost+of+Tsushima+DIRECTOR'S+CUT+-+2215430.zip/file" },
    "289650": { name: "Assassin's Creed Unity", link: "https://www.mediafire.com/file/p928zc6931ihze3/289650+-+Assassin's+Creed®+Unity.zip/file" },
    "3241660": { name: "R.E.P.O", link: "https://www.mediafire.com/file/h0vqv2fqkj8psv0/3241660+-+R.E.P.O+Updated.zip/file" },
    "1903340": { name: "Expedition 33", link: "https://www.mediafire.com/file/9uqjahdu4pb1sjv/1903340+-+Expedition+33.zip/file" },
    "3240220": { name: "Grand Theft Auto V Enhanced", link: "https://www.mediafire.com/file/mc81a7ag05vsea4/3240220+-+GTAV+Enhanced.zip/file" },
    "2668510": { name: "Red Dead Redemption", link: "https://www.mediafire.com/file/zcl6u4bwv6d846x/RDR1.zip/file" },
    "3590": { name: "PVZ GOTY Edition", link: "https://www.mediafire.com/file/uo8mq63w3k43qc8/3590+-+PVZ+GOTY+Edition.zip/file" },
    "3164500": { name: "Schedule 1", link: "https://www.mediafire.com/file/od4rj24czo8uop3/3164500+-+Schedule+1.zip/file" },
    "508440": { name: "Totally Accurate battle Simulator", link: "https://www.mediafire.com/file/bdakhtu7uu1d2kx/508440+-+Totally+Accurate+Battle+Simulator.zip/file" },
    "1332720": { name: "Thief Simulator 2", link: "https://www.mediafire.com/file/jzuw92lu3vitbn9/1332720+-+Thief+Simulator+2.zip/file" },
    "1290000": { name: "PowerWash Simulator", link: "https://www.mediafire.com/file/xoh1kgj8g9f4133/1290000+-+PowerWash+Simulator.zip/file" },
    "611670": { name: "The Elder Scrolls V Skyrim VR", link: "https://www.mediafire.com/file/i3ibv1ji2zvv8dn/611670+-+The+Elder+Scrolls+V+Skyrim+VR.zip/file" },
    "1190970": { name: "House Flipper 2", link: "https://www.mediafire.com/file/o255az3ljqgkc9w/1190970+-+House+Flipper+2.zip/file" },
    "1817190": { name: "Spider-Man Miles Morales", link: "https://www.mediafire.com/file/a4aem3444d2uvx6/1817190+Spider-Man+MM.zip/file" },
    "3017860": { name: "DOOM The Dark Ages", link: "https://www.mediafire.com/file/i5t0rrnpjsasihp/3017860+-+DOOM+The+Dark+Ages.zip/file" },
    "379720": { name: "DOOM", link: "https://www.mediafire.com/file/m21v31md6yt2h0p/379720+-+DOOM.zip/file" },
    "1817070": { name: "Spider-man Remastered", link: "https://www.mediafire.com/file/xlw3jxh3vlghy88/1817070+-+Spider-Man+Remastered.zip/file" },
    "72850": { name: "The Elder Scroll V Skyrim", link: "https://www.mediafire.com/file/jvsts1xow0k2vwv/72850+-+The+Elder+Scrolls+V+Skyrim.zip/file" },
    "3159330": { name: "Assassins Creed Shadows (denuvo)", link: "https://www.mediafire.com/file/yis44gcyw8wnanr/3159330+-+Assassins+Creed+Shadows.zip/file" },
    "2623190": { name: "The Elder Scrolls IV Oblivion Remastered", link: "https://www.mediafire.com/file/1he2rkq6zr4dqst/2623190+-+The+Elder+Scrolls+IV+Oblivion+Remastered.zip/file" },
    "105600": { name: "Terraria", link: "https://www.mediafire.com/file/zjcs645y4mp8mi7/105600+-+Terraria.zip/file" },
    "3259470": { name: "Papa's Pizzeria Deluxe", link: "https://www.mediafire.com/file/nt2t9lx5on5wnep/3259470+-+Papa's+Pizzeria+Deluxe.zip/file" },
    "1366800": { name: "Crosshair X", link: "https://www.mediafire.com/file/5vka5k7mwtookwg/1366800+-+Crosshair+X.zip/file" },
    "1284190": { name: "The Planet Crafter", link: "https://www.mediafire.com/file/n9fpi3s2j7pifc7/1284190+-+The+Planet+Crafter.zip/file" },
    "322170": { name: "Geometry Dash", link: "https://www.mediafire.com/file/7g34an29q400bvw/322170+-+Geometry+Dash.zip/file" },
    "1030840": { name: "Mafia Definitive Edition", link: "https://www.mediafire.com/file/pye2ung0px9ljy5/1030840+-+Mafia+Definitive+Edition.zip/file" },
    "50130": { name: "Mafia II (Classic)", link: "https://www.mediafire.com/file/auvpn03rzn4qc2j/50130+-+Mafia+II+(Classic).zip/file" },
    "1364780": { name: "Street Fighter™ 6", link: "https://www.mediafire.com/file/2af7wl3s1gciwyh/1364780+-+Street+Fighter™+6.zip/file" },
    "292030": { name: "The Witcher 3 Wild Hunt", link: "https://www.mediafire.com/file/1lbi4ktvl8a3hru/292030+-+The+Witcher+3+Wild+Hunt.zip/file" },
    "2627570": { name: "Goofy Gorilla's", link: "https://www.mediafire.com/file/2bz5tzqcvl0m4mr/2627570+-+Goofy+Gorillas.zip/file" },
    "1455630": { name: "The Game Of Life 2", link: "https://www.mediafire.com/file/zxnewps9tlty3nx/1455630+-+THE+GAME+OF+LIFE+2.zip/file" },
    "967050": { name: "Pacify", link: "https://www.mediafire.com/file/tl8e0t19oea1ro4/967050+-+pacify.zip/file" },
    "3527290": { name: "Peak", link: "https://www.mediafire.com/file/b44cgoyph79erc0/3527290+-+Peak.zip/file" },
    "201870": { name: "Assassin's Creed Revelations", link: "https://www.mediafire.com/file/vitza4j299o22hy/201870+-+Assassin's+Creed+Revelations.zip/file" },
    "962130": { name: "Grounded", link: "https://www.mediafire.com/file/qd7vmf0r77rdlrt/962130+-+grounded.zip/file" },
    "33230": { name: "Assassin's Creed II", link: "https://www.mediafire.com/file/6um2e3s1vjqzxxh/33230+-+Assassin's+Creed+II.zip/file" },
    "286160": { name: "Table Top Simulator", link: "https://www.mediafire.com/file/2kx5nw4wdsuzw8v/286160+-+table+top+sim.zip/file" },
    "1682970": { name: "Uncrashed", link: "https://www.mediafire.com/file/s244lddmbiu72ae/1682970+-+Uncrashed++FPV+Drone+Simulator.zip/file" },
    "2272540": { name: "FBC FireBreak", link: "https://www.mediafire.com/file/9t2lgtt85qpue4g/2272540+-+fbc+firebreak.zip/file" },
    "2622380": { name: "Elden Ring Nightreign", link: "https://www.mediafire.com/file/8z115cj2pd02ewb/2622380+-+ELDEN+RING+NIGHTREIGN.zip/file" },
    "1222700": { name: "A Way Out", link: "https://www.mediafire.com/file/rk8glav00ir5y1x/1222700+-+A+Way+Out.zip/file" },
    "242050": { name: "Assassin's Creed IV Black Flag", link: "https://www.mediafire.com/file/fo1laa5gfk5fvxd/242050+-+Assassin's+Creed+IV+Black+Flag.zip/file" },
    "3035570": { name: "Assassin's Creed Mirage", link: "https://www.mediafire.com/file/sgc4pefzc1ecl1q/3035570+-+Assassin's+Creed+Mirage.zip/file" },
    "289650": { name: "Assassin's Creed Unity", link: "https://www.mediafire.com/file/asq0vd9bvy3a30t/289650+-+Assassin's+Creed+Unity.zip/file" },
    "3489700": { name: "Stellar Blade", link: "https://www.mediafire.com/file/ff0ac134ishf49m/3489700+-+Stellar+Blade™.zip/file" },
    "2406770": { name: "BodyCam", link: "https://www.mediafire.com/file/agcllc8dl8fh4r7/2406770+-+BodyCam.zip/file" },
    "368500": { name: "Assassin's Creed Syndicate", link: "https://www.mediafire.com/file/qks6yr5yabx43mk/368500+-+Assassin's+Creed+Syndicate.zip/file" },
    "1659040": { name: "HITMAN World of Assassination", link: "https://www.mediafire.com/file/dpz9ib1gc7f7hpy/1659040+-+HITMAN+World+of+Assassination.zip/file" },
    "1435790": { name: "Escape Simulator", link: "https://www.mediafire.com/file/5s3wnm6y3bgchqf/1435790+-+escape+sim.zip/file" },
    "812140": { name: "Assassin's Creed Odyssey", link: "https://www.mediafire.com/file/ou7in6l679l5qei/812140+-+Assassin's+Creed+Odyssey.zip/file" },
    "251570": { name: "7 Days to die", link: "https://www.mediafire.com/file/xy4koj0fww9vnje/251570+-+7+days+to+die.zip/file" },
    "2208920": { name: "Assassin's Creed Valhalla", link: "https://www.mediafire.com/file/ufdbbxuz9juq12v/2208920+-+Assassin's+Creed+Valhalla.zip/file" },
    "550": { name: "Left 4 Dead 2", link: "https://www.mediafire.com/file/0mgyym4q2o2ftz1/550+-+left+4+dead+2.zip/file" },
    "1107320": { name: "OutBrk", link: "https://www.mediafire.com/file/vd0nc2fq3lgfjmu/1107320+-+OUTBRK.zip/file" },
    "1593500": { name: "God Of War", link: "https://www.mediafire.com/file/88i74z2obp04hsr/1593500+-+God+Of+War.zip/file" },
    "739630": { name: "Phasmophobia", link: "https://www.mediafire.com/file/cyz7ath36vpulk4/739630_-_Phasmophobia.zip/file" }
};

        // Convert to Map for better performance
        Object.entries(gamesData).forEach(([id, game]) => {
            this.games.set(id, {
                ...game,
                id,
                isFavorite: this.favorites.has(id),
                lastAccessed: localStorage.getItem(`lastAccessed_${id}`) || null
    });
});

        this.filteredGames = new Map(this.games);
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
        e.preventDefault();
                this.switchTab(button.id);
    });
});

// Search functionality
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const clearButton = document.getElementById('clear-search');
        const sortSelect = document.getElementById('sort-select');

        if (searchButton) {
            searchButton.addEventListener('click', () => this.performSearch());
        }
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch();
            });
            searchInput.addEventListener('input', debounce(() => this.performSearch(), 300));
        }
        if (clearButton) {
            clearButton.addEventListener('click', () => this.clearSearch());
        }
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => this.sortGames(e.target.value));
        }

        // Games view controls
        const gridView = document.getElementById('grid-view');
        const listView = document.getElementById('list-view');
        const gamesFilter = document.getElementById('games-filter');
        
        if (gridView) {
            gridView.addEventListener('click', () => this.setView('grid'));
        }
        if (listView) {
            listView.addEventListener('click', () => this.setView('list'));
        }
        if (gamesFilter) {
            gamesFilter.addEventListener('input', 
                debounce((e) => this.filterGames(e.target.value), 300));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
        
        // Modal click outside to close
        document.addEventListener('click', (e) => this.handleModalClick(e));
    }

    switchTab(tabId) {
        console.log('Switching to tab:', tabId);
        const tabName = tabId.replace('-tab', '');
        const panelId = `${tabName}-panel`;
        
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Update panels
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        const activePanel = document.getElementById(panelId);
        if (activePanel) {
            activePanel.classList.add('active');
        }

        // Update ARIA attributes
        document.querySelectorAll('.tab-button').forEach(btn => btn.setAttribute('aria-selected', 'false'));
        if (activeTab) {
            activeTab.setAttribute('aria-selected', 'true');
        }

        // Special handling for different tabs
        if (tabName === 'games') {
            this.renderGames();
        } else if (tabName === 'downloads') {
            this.clearSearch();
        }
        
        console.log('Tab switched successfully to:', tabName);
    }

    performSearch() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;
        
        const query = searchInput.value.trim().toLowerCase();
        this.searchQuery = query;
        
        if (!query) {
            this.clearSearch();
        return;
    }

        this.filteredGames.clear();
        
        for (const [id, game] of this.games) {
            if (id.includes(query) || game.name.toLowerCase().includes(query)) {
                this.filteredGames.set(id, game);
            }
        }

        this.updateSearchStatus();
        this.renderSearchResults();
    }

    clearSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        const searchStatus = document.getElementById('search-status');
        
        if (searchInput) searchInput.value = '';
        this.searchQuery = '';
        this.filteredGames = new Map(this.games);
        if (searchResults) searchResults.innerHTML = '';
        if (searchStatus) searchStatus.textContent = '';
    }

    updateSearchStatus() {
        const status = document.getElementById('search-status');
        if (!status) return;
        
        const count = this.filteredGames.size;
        
        if (this.searchQuery) {
            status.textContent = `Found ${count} game${count !== 1 ? 's' : ''} matching "${this.searchQuery}"`;
        } else {
            status.textContent = '';
        }
    }

    sortGames(sortType) {
        this.currentSort = sortType;
        const gamesArray = Array.from(this.filteredGames.entries());
        
        gamesArray.sort(([idA, gameA], [idB, gameB]) => {
            switch (sortType) {
                case 'name-asc':
                    return gameA.name.localeCompare(gameB.name);
                case 'name-desc':
                    return gameB.name.localeCompare(gameA.name);
                case 'id-asc':
                    return parseInt(idA) - parseInt(idB);
                case 'id-desc':
                    return parseInt(idB) - parseInt(idA);
                default:
                    return 0;
            }
        });

        this.filteredGames = new Map(gamesArray);
        this.renderSearchResults();
    }

    setView(viewType) {
        this.currentView = viewType;
        const gamesGrid = document.getElementById('games-grid');
        
        // Update view buttons
        document.querySelectorAll('.view-button').forEach(btn => btn.classList.remove('active'));
        const activeButton = document.getElementById(`${viewType}-view`);
        if (activeButton) activeButton.classList.add('active');
        
        // Update grid class
        if (gamesGrid) {
            gamesGrid.classList.toggle('list-view', viewType === 'list');
        }
        
        this.renderGames();
    }

    filterGames(query) {
        const gamesGrid = document.getElementById('games-grid');
        if (!gamesGrid) return;
        
        const gameCards = gamesGrid.querySelectorAll('.game-card');
        
        gameCards.forEach(card => {
            const gameNameEl = card.querySelector('h3');
            const appIdEl = card.querySelector('p');
            
            if (!gameNameEl || !appIdEl) return;
            
            const gameName = gameNameEl.textContent.toLowerCase();
            const appId = appIdEl.textContent.toLowerCase();
            const matches = gameName.includes(query.toLowerCase()) || appId.includes(query.toLowerCase());
            
            card.style.display = matches ? 'block' : 'none';
        });
    }

    renderSearchResults() {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;
        
        resultsContainer.innerHTML = '';
        
        if (this.filteredGames.size === 0) {
            resultsContainer.innerHTML = '<p class="no-results">No games found matching your search.</p>';
            return;
        }

        for (const [id, game] of this.filteredGames) {
            const gameElement = this.createGameCard(id, game);
            resultsContainer.appendChild(gameElement);
        }
    }

    renderGames() {
        const gamesGrid = document.getElementById('games-grid');
        if (!gamesGrid) return;
        
        gamesGrid.innerHTML = '';
        
        const gamesArray = Array.from(this.games.entries());
        
        // Sort games for display
        gamesArray.sort(([idA, gameA], [idB, gameB]) => {
            return gameA.name.localeCompare(gameB.name);
        });

        gamesArray.forEach(([id, game]) => {
            const gameElement = this.createGameCard(id, game);
            gamesGrid.appendChild(gameElement);
        });
    }

    createGameCard(id, game) {
        const gameElement = document.createElement('div');
        gameElement.className = 'game-card';
        gameElement.setAttribute('data-game-id', id);
        
        const isFavorite = this.favorites.has(id);
        const favoriteIcon = isFavorite ? 'fas fa-heart' : 'far fa-heart';
        
        gameElement.innerHTML = `
            <div class="game-header">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="app.toggleFavorite('${id}')" aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                    <i class="${favoriteIcon}" aria-hidden="true"></i>
                </button>
            </div>
            <img src="https://steamcdn-a.akamaihd.net/steam/apps/${id}/header.jpg" 
                 alt="${game.name}" 
                 loading="lazy"
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDI4MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'">
            <div class="game-info">
            <h3>${game.name}</h3>
            <p>App ID: ${id}</p>
            </div>
            <div class="game-actions">
                <button onclick="app.copyAppId('${id}')" class="action-btn copy-btn" aria-label="Copy App ID">
                    <i class="fas fa-copy" aria-hidden="true"></i>
                    <span>Copy ID</span>
                </button>
                <button onclick="app.downloadGame('${game.link}')" class="action-btn download-btn" aria-label="Download game">
                    <i class="fas fa-download" aria-hidden="true"></i>
                    <span>Download</span>
                </button>
            </div>
        `;
        
        return gameElement;
    }

    toggleFavorite(gameId) {
        if (this.favorites.has(gameId)) {
            this.favorites.delete(gameId);
            this.showToast('Removed from favorites', 'info');
        } else {
            this.favorites.add(gameId);
            this.showToast('Added to favorites', 'success');
        }
        
        localStorage.setItem('favorites', JSON.stringify([...this.favorites]));
        this.renderGames();
        this.renderSearchResults();
    }

    async copyAppId(gameId) {
        try {
            await navigator.clipboard.writeText(gameId);
            this.showToast(`Copied App ID: ${gameId}`, 'success');
            
            // Track usage
            localStorage.setItem(`lastAccessed_${gameId}`, new Date().toISOString());
        } catch (error) {
            console.error('Failed to copy:', error);
            this.showToast('Failed to copy App ID', 'error');
        }
    }

    downloadGame(link) {
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
            this.showToast('Opening download link...', 'info');
        } else {
            this.showToast('Download link not available', 'warning');
        }
    }

    updateStats() {
        const totalGames = document.getElementById('total-games');
        const totalDownloads = document.getElementById('total-downloads');
        
        if (totalGames) totalGames.textContent = this.games.size;
        if (totalDownloads) totalDownloads.textContent = this.favorites.size;
    }

    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('show');
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.remove('show');
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getToastIcon(type);
        toast.innerHTML = `
            <i class="${icon}" aria-hidden="true"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    getToastIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    handleKeyboardNavigation(e) {
        // ESC key clears search or closes modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('modal');
            if (modal && modal.classList.contains('show')) {
                this.hideModal();
            } else {
                this.clearSearch();
            }
        }
        
        // Ctrl/Cmd + K focuses search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.focus();
        }
    }

    showModal(type) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        let title, content;
        
        switch (type) {
            case 'privacy':
                title = 'Privacy Policy';
                content = this.getPrivacyContent();
                break;
            case 'terms':
                title = 'Terms of Service';
                content = this.getTermsContent();
                break;
            case 'contact':
                title = 'Contact Us';
                content = this.getContactContent();
                break;
            default:
                return;
        }
        
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus the modal for accessibility
        modal.focus();
    }

    hideModal() {
        const modal = document.getElementById('modal');
        if (!modal) return;
        
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
    }

    handleModalClick(e) {
        const modal = document.getElementById('modal');
        if (!modal || !modal.classList.contains('show')) return;
        
        // Close modal if clicking outside the modal content
        if (e.target === modal) {
            this.hideModal();
        }
    }

    getPrivacyContent() {
        return `
            <h3>Information We Collect</h3>
            <p>Steamy Dumplings is designed with privacy in mind. We collect minimal information:</p>
            <ul>
                <li><strong>Local Storage:</strong> Your favorite games are stored locally in your browser</li>
                <li><strong>Usage Data:</strong> No personal data is collected or transmitted</li>
                <li><strong>Game Data:</strong> All game information is publicly available Steam data</li>
            </ul>
            
            <h3>How We Use Information</h3>
            <p>We use the minimal data we collect to:</p>
            <ul>
                <li>Remember your favorite games across sessions</li>
                <li>Improve the user experience</li>
                <li>Provide offline functionality</li>
            </ul>
            
            <h3>Data Storage</h3>
            <p>All data is stored locally in your browser. We do not:</p>
            <ul>
                <li>Store data on external servers</li>
                <li>Share data with third parties</li>
                <li>Track your browsing habits</li>
                <li>Use analytics or tracking cookies</li>
            </ul>
            
            <h3>Your Rights</h3>
            <p>You have full control over your data:</p>
            <ul>
                <li>Clear your browser's local storage to remove all data</li>
                <li>Disable JavaScript to prevent data collection</li>
                <li>Use the site without creating favorites</li>
            </ul>
            
            <h3>Contact</h3>
            <p>If you have questions about this privacy policy, please contact us using the Contact link in the footer.</p>
        `;
    }

    getTermsContent() {
        return `
            <h3>Acceptance of Terms</h3>
            <p>By using Steamy Dumplings, you agree to be bound by these Terms of Service.</p>
            
            <h3>Service Description</h3>
            <p>Steamy Dumplings provides access to Steam game manifests and related information. This service is:</p>
            <ul>
                <li>Free to use</li>
                <li>Provided "as is" without warranties</li>
                <li>Subject to availability</li>
            </ul>
            
            <h3>User Responsibilities</h3>
            <p>Users are responsible for:</p>
            <ul>
                <li>Complying with Steam's Terms of Service</li>
                <li>Using downloaded content legally</li>
                <li>Respecting intellectual property rights</li>
                <li>Not misusing the service</li>
            </ul>
            
            <h3>Limitation of Liability</h3>
            <p>Steamy Dumplings is not responsible for:</p>
            <ul>
                <li>Any damages resulting from use of the service</li>
                <li>Availability of download links</li>
                <li>Content accuracy or completeness</li>
                <li>Third-party actions or content</li>
            </ul>
            
            <h3>Intellectual Property</h3>
            <p>All Steam game data and images are property of their respective owners. This service:</p>
            <ul>
                <li>Does not claim ownership of game content</li>
                <li>Provides links to publicly available data</li>
                <li>Respects copyright and trademark rights</li>
            </ul>
            
            <h3>Service Availability</h3>
            <p>We strive to maintain service availability but cannot guarantee:</p>
            <ul>
                <li>Continuous uptime</li>
                <li>Data accuracy</li>
                <li>Link functionality</li>
            </ul>
            
            <h3>Changes to Terms</h3>
            <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of changes.</p>
        `;
    }

    getContactContent() {
        return `
            <h3>Get in Touch</h3>
            <p>We'd love to hear from you! Here's how you can reach us:</p>
            
            <h3>General Inquiries</h3>
            <p>For general questions, suggestions, or feedback about Steamy Dumplings:</p>
            <ul>
                <li><strong>Email:</strong> SteamyDumplings@outlook.com</li>
                <li><strong>Response Time:</strong> We typically respond within 24-48 hours</li>
            </ul>
            
            <h3>Technical Support</h3>
            <p>If you're experiencing technical issues:</p>
            <ul>
                <li>Check your browser console for error messages</li>
                <li>Try refreshing the page</li>
                <li>Clear your browser cache</li>
                <li>Ensure JavaScript is enabled</li>
            </ul>
            
            <h3>Feature Requests</h3>
            <p>Have an idea for a new feature? We're always looking to improve!</p>
            <ul>
                <li>Describe your idea in detail</li>
                <li>Explain how it would benefit users</li>
                <li>Include any relevant examples</li>
            </ul>
            
            <h3>Bug Reports</h3>
            <p>Found a bug? Help us fix it by providing:</p>
            <ul>
                <li>Steps to reproduce the issue</li>
                <li>Your browser and version</li>
                <li>Any error messages</li>
                <li>Screenshots if applicable</li>
            </ul>
            
            <h3>Community</h3>
            <p>Join our community:</p>
            <ul>
                <li><strong>Discord:</strong> Join our Discord server for discussions</li>
                <li><strong>GitHub:</strong> Contribute to the project on GitHub</li>
                <li><strong>Reddit:</strong> Follow us on r/SteamyDumplings</li>
            </ul>
            
            <h3>Business Inquiries</h3>
            <p>For business partnerships or collaboration opportunities:</p>
            <ul>
                <li><strong>Email:</strong> SteamyDumplings@outlook.com</li>
                <li><strong>Subject:</strong> Please include "Business Inquiry" in the subject line</li>
            </ul>
            
            <p><em>Thank you for using Steamy Dumplings! 🥟</em></p>
        `;
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SteamyDumplingsApp();
    
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
        registerServiceWorker();
    }
});

// Service Worker Registration
async function registerServiceWorker() {
    try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        });
        
        console.log('Service Worker registered successfully:', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New version available
                    showUpdateNotification();
                }
    });
});
        
        // Handle service worker messages
        navigator.serviceWorker.addEventListener('message', (event) => {
            console.log('Message from service worker:', event.data);
        });
        
    } catch (error) {
        console.error('Service Worker registration failed:', error);
    }
}

// Show update notification
function showUpdateNotification() {
    if (window.app) {
        window.app.showToast('New version available! Refresh to update.', 'info');
        
        // Add refresh button to toast
        setTimeout(() => {
            const toast = document.querySelector('.toast:last-child');
            if (toast) {
                const refreshBtn = document.createElement('button');
                refreshBtn.textContent = 'Refresh';
                refreshBtn.style.marginLeft = '10px';
                refreshBtn.style.padding = '5px 10px';
                refreshBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                refreshBtn.style.border = 'none';
                refreshBtn.style.borderRadius = '4px';
                refreshBtn.style.color = 'white';
                refreshBtn.style.cursor = 'pointer';
                refreshBtn.onclick = () => window.location.reload();
                toast.appendChild(refreshBtn);
            }
        }, 100);
    }
}

