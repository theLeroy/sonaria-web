/** Timetable slots with optional artist descriptions from the Artist Sheet. */

export type StageId = 'silsi' | 'mutowac' | 'aerodrom'

export type SlotTag = 'vinyl' | 'live' | 'workshop' | 'band' | 'performance' | 'offen'

export type LineupSlot = Readonly<{
  name: string
  time: string
  tag?: SlotTag
  description?: string
  soundcloud?: string
  instagram?: string
  spotify?: string
  website?: string
}>

export type LineupStageBlock = Readonly<{
  stageId: StageId
  slots: readonly LineupSlot[]
}>

export const freitagStages: readonly LineupStageBlock[] = [
  {
    stageId: 'silsi',
    slots: [
      {
        name: 'Wokey (Chames)',
        time: '18:00–20:00',
        soundcloud: 'https://on.soundcloud.com/UB9nVcwlORF20FJzMo',
        instagram: 'https://www.instagram.com/wokey._',
      },
      {
        name: 'mae.be',
        time: '20:00–22:00',
      },
      {
        name: 'Henk',
        time: '22:00–23:30',
        tag: 'vinyl',
        soundcloud: 'https://on.soundcloud.com/9GjVwJXPLaTi2dGcY4',
        instagram: 'https://www.instagram.com/djhenk_',
      },
      {
        name: 'Lolalita',
        time: '23:30–01:30',
      },
    ],
  },
  {
    stageId: 'mutowac',
    slots: [
      {
        name: 'sryxo',
        time: '16:00–18:00',
        description: 'Another long-ass bio trying to fit the entirety of an artistic personality in an unethically small paragraph coming in 3..2..1.. sryxo doesn\'t really believe in genres, mostly because she can\'t be bothered to pick one. In some sets she\'s dived into the niches of leftfield, trip-hop or IDM, in others, she\'s shaken the walls with breaks, jungle and acid, or even let herself be swept up in the currents of driving progressive house and 90’s goa. Against what she\'s comfortable admitting, recently even her inner tech-house alter ego has sneaked in. She\'ll touch on common ground, and give you what you wished for – but since she doesn\'t like to follow the plastered streets only, expect a detour or two, straight into the gems you didn\'t know you needed. The dancefloor she dreams of is euphoric and fun, open to exploration and innovation. The crowd she demands is political: caring, empathetic and inclusive. You\'ll have caught her at festivals like B-Sides, Gurtenfestival, Am Bach or Schwing & Stampf; and in clubs like Klub Kegelbahn, Neubad, Kauz and Zentralwäscherei across Zurich, Lucerne and other corners of Switzerland – international presence still loading, please stand by. Off the decks, she\'s part of the collective Kon-Takt, doing the unglamorous work of booking, curating and occasionally arguing about club politics, because someone has to think about this stuff while the rest of us are just trying to find the bathroom. Thanks for reading this chapter, and accepting that now you know even less what to expect than before... xoxo, sorriest girl.',
        soundcloud: 'https://on.soundcloud.com/ueNpbUo5SABHmdPJzz',
        instagram: 'https://www.instagram.com/_sryxo/',
      },
      {
        name: 'Zelev',
        time: '18:00–20:00',
        description: 'Zelev pendelt zwischen Zug und Zürich und bringt eine lange Geschichte mit Musik mit: Chor, Gesang, Piano, Songwriting — über 15 Jahre Feingefühl für Stimme, Melodie und alles, was zwischen den Tönen passiert. Bevor der Club dazukam, war Musik für sie längst Sprache, Rückzugsort und innerer Puls. Seit 2022 spielt sie in Clubs und auf Festivals in der Schweiz, Berlin, London und Vietnam und hat sich dabei eine eigene Spur gelegt. Ihre Sets bewegen sich durch tiefe Basslines, meditative Layer, perkussive Funken und Tracks mit Geheimfach — sinnlich, wach und nie zu offensichtlich. Musik, die Raum lässt, aber trotzdem Bewegung auslöst. Als leidenschaftliche Diggerin zieht es Zelev zum Unbekannten: zu Sounds, die selten wirken, aber sofort andocken; zu Tracks, die nicht alles verraten und trotzdem hängen bleiben. Kein Genre-Käfig, kein Standardprogramm — eher ein feines Gespür für Atmosphäre, Körper und den Moment, in dem Menschen, Musik und Raum kurz dieselbe Sprache sprechen. Zelev sucht das Unerwartete und macht es zugänglich. Sound für offene Ohren, schnelle Füsse und weiche Knie.',
        soundcloud: 'https://soundcloud.com/zelevch/popular-tracks',
        instagram: 'https://www.instagram.com/zelev____/',
      },
      {
        name: 'Bernd Bugatti',
        time: '20:00–22:00',
        description: 'Wer hinter dem Namen einen Autohändler mit fragwürdigen Leasingangeboten vermutet, liegt komplett richtig. Neben dubiosen Verträgen kann Bernd aber auch Musik und liefert als Teil des Münchner Kollektivs "Folge der Wolke" stets groovigen Sound ohne Rücksicht auf Genregrenzen. Dieses Mal erwarten euch eine Mischung aus Minimal, Tech House und Indie Dance, oder allem, was sich gut anfühlt. Freut euch auf die "Geheimwaffe" aus Berlin, this is going to be BERNdig 🕺',
        soundcloud: 'https://on.soundcloud.com/Euqd6D5ydPsCHT9R5j',
        instagram: 'https://www.instagram.com/bernd_bugatti',
      },
      {
        name: 'Sidefin',
        time: '22:00–00:00',
        soundcloud: 'https://on.soundcloud.com/oH52NJNYk99crtAiyX',
        instagram: 'https://www.instagram.com/side.fin',
      },
      {
        name: 'DJ Clausette',
        time: '00:00–02:00',
        description: 'Einst war sie als Clausette La Trine die bekannteste Drag Queen von Bern, nun setzt sie sich als DJ in Szene. Musikalisch mag sie es dramatisch und dreckig. Die Diva hinter dem DJ-Pult weiss dank Ihrer langjährigen Erfahrung im Tingeln durch Schwulenbars und Undergroundclubs nämlich genau, was die Meute ins Schwitzen bringt. Ihre Sets sind eine energiereiche Mischung aus Indie Dance, Dark and Electronic Disco.',
        soundcloud: 'https://soundcloud.com/djclausette',
        instagram: 'https://www.instagram.com/djclausette',
      },
    ],
  },
  {
    stageId: 'aerodrom',
    slots: [
      {
        name: 'Contact Dance',
        time: '18:30–20:00',
        tag: 'workshop',
      },
      {
        name: 'Eggs and Tiaras',
        time: '21:00–22:00',
        tag: 'band',
        description: 'Das Electro-Clashpop-Duo eggs and tiaras aus Zürich und Neuchâtel erzählt mit einem Hauch von Provokation die teils düsteren Geschichten des Alltags. Über harten Kicks und verspielten Synthesizer-Melodien legen sich zwei Stimmen mit Texten auf Französisch, Englisch und Deutsch. eggs and tiaras spielen mit Gegensätzen: Sie bewegen sich zwischen ernsten Themen und scharfer Ironie, brechen bewusst mit Erwartungen und tragen dabei stets eine mitreissende Energie nach vorne – mit dem Ziel, die Freude am Widerstand zu teilen.',
        soundcloud: 'https://on.soundcloud.com/Y1mg0bc2VHKY7gZPid',
        instagram: 'https://www.instagram.com/eggs_and_tiaras/',
      },
      {
        name: 'Tanz Performance',
        time: '22:30–23:30',
        tag: 'performance',
      },
      {
        name: 'Karaoke',
        time: '23:30–02:00',
        tag: 'performance',
      },
    ],
  },
]

export const samstagStages: readonly LineupStageBlock[] = [
  {
    stageId: 'silsi',
    slots: [
      {
        name: 'civic3mille',
        time: '14:30–16:30',
        tag: 'vinyl',
        description: 'Behind the name civic3mille is Madani Sakho, a young DJ from Bern who had music written into his DNA from the very start. As a little boy, his parents introduced him to an incredibly rich range of sounds. Blues, Jazz, Salsa, House to name a few. That early, curious relationship with music still shapes everything about the way he plays today. If you had to describe his style in a single word, it would be odyssey. He takes the crowd on a long, adventurous journey where you never quite know where it\'s heading next. His sets reach beyond genre boundaries, built around a track selection that is always surprising, always intentional. The goal is to catch people off guard and pull them in deeper with every transition.',
        soundcloud: 'https://soundcloud.com/civic3mille',
        instagram: 'https://www.instagram.com/civic3mille/',
      },
      {
        name: 'Mad Moiselle',
        time: '16:30–18:00',
      },
      {
        name: 'Mount thizzz',
        time: '18:00–20:00',
        soundcloud: 'https://soundcloud.com/mount-thizzz',
        instagram: 'https://www.instagram.com/montis.creations/',
      },
      {
        name: 'Chevril',
        time: '20:00–22:00',
      },
      {
        name: '1luu',
        time: '22:00–00:00',
      },
      {
        name: 'Shady',
        time: '00:00–02:00',
      },
      {
        name: 'Lotty',
        time: '02:00–04:00',
      },
    ],
  },
  {
    stageId: 'mutowac',
    slots: [
      {
        name: 'Miko San',
        time: '11:00–13:00',
        soundcloud: 'https://soundcloud.com/miko_san',
        instagram: 'https://www.instagram.com/madame_bonnuit/',
      },
      {
        name: 'C.G. Henge & Elster',
        time: '13:00–15:00',
      },
      {
        name: 'Jola',
        time: '15:00–17:00',
        soundcloud: 'https://soundcloud.com/jola-luz',
        instagram: 'https://www.instagram.com/___jola___/',
      },
      {
        name: 'RTM b2b vert_31',
        time: '17:00–19:00',
        soundcloud: 'https://on.soundcloud.com/OkgSh1HsZfIsLM32Vy',
      },
      {
        name: 'DJ Nebelmaschine & LariFari feat Reznap',
        time: '19:00–21:00',
        tag: 'live',
        description: 'LariFari packt die Bänger mit den sassy Vocals aus, DJ Nebelmaschine fuhrwerkt wild an den Turntables bis sich die Töne verbiegen und Reznap untermalt das Ganze virtuos mit seinem Waldhorn und am Synthesizer. Was dabei rauskommt? Eine wilde Mischung aus Indie Dance, Tech House und Deep-Tech mit fetten Basslines, verspulten Vocals und grandiosen Live Elementen - bald auch auf einem Berg in deiner Nähe!',
        soundcloud: 'https://soundcloud.com/dj_nebelmaschine',
        instagram: 'https://www.instagram.com/dj.nebelmaschine/',
      },
      {
        name: 'Chora',
        time: '21:00–23:00',
      },
      {
        name: 'Acid Gurke',
        time: '23:00–01:00',
        description: 'acidgurke ist ein tiefer Trip durch die Sphären des musikalischen Untergrunds. Ihre Sets sind zugleich melodisch und perkussiv, hypnotisch und aufweckend, wellenartig und impulsiv. Für ihre Reise auf dem Sonaria 2026 hat acidgurke einige Überraschungen in ihrer Wundertüte. Eines kann sie jedoch jetzt schon verraten: Diese Reise kennt nur eine Richtung und das ist vorwärts.',
        soundcloud: 'https://soundcloud.com/ae-b-11616851',
        instagram: 'https://www.instagram.com/dj_acidgurke/',
      },
      {
        name: 'Akra Ondo',
        time: '01:00–03:00',
        description: 'Musikalisch hat sich Akra Ondo über organische Downtempo-Sounds und Breakbeats hin zu House, Acidhouse, Trance und Techno entwickelt. Heute liegt ihr Fokus auf deepen, hypnotischen Klangwelten, die introspektiv, psychedelisch und nischig sind. Die DJ Sets von Akra Ondo sind bekannt für ihre sorgfältige Kuration, welche die Zuhörenden mitnimmt und einlädt auf eine Reise. Treibende Basslines, ausgeklügelte Rhythmen, verspielte Geräusche und warm umhüllende Flächen laden ein mit sich und der Umwelt in Verbindung zu kommen.',
        soundcloud: 'https://on.soundcloud.com/KgBnt4HzLPpvjB0Jfy',
        instagram: 'https://www.instagram.com/akra_ondo',
      },
      {
        name: 'Ápeiron',
        time: '03:00–05:00',
      },
    ],
  },
  {
    stageId: 'aerodrom',
    slots: [
      {
        name: 'Yoga',
        time: '10:00–11:00',
        tag: 'workshop',
        description: 'Authentic Flow Ist eine somatische Yogapraxis, die eine achtsame Verbindung zu unserem Körper und der Aussenwelt ermöglicht. Das Ziel ist genau da, wo du gerade bist. Es ist eine direkte sinnliche Erfahrung von dir und dem Moment im jetzt begleitet von Musik. Es lädt dazu ein, wieder zuzuhören, zu spüren und bewusster in Kontakt mit uns selbst und unserer Umwelt zu treten. Die Stunde ist offen für alle Erfahrungslevel und alle Menschen, die sich Zeit für sich und ihren Körper nehmen wollen :)',
        instagram: 'https://www.instagram.com/print_flow_bern',
      },
      {
        name: 'Male accountability',
        time: '11:00–13:00',
        tag: 'workshop',
        description: 'Scheissverhalten passiert überall – auch auf dem Sonaria. Wie können wir eine Kultur des Hinschauens entwickeln? Interaktiver Workshop mit Gruppendiskussionencis Männer erwünscht, all genders welcome',
        website: 'https://www.feministen.ch',
        instagram: 'https://www.instagram.com/diefeministen',
      },
      {
        name: 'Schreibwerkstatt',
        time: '13:00–14:00',
        tag: 'workshop',
      },
      {
        name: 'Pubquiz',
        time: '15:00–16:30',
        tag: 'workshop',
        description: 'Gehirnzellen aktivieren ist die beste Vorbereitung für eine wilde Ravenacht, das wussten bereits Römer:innen ( - oder so?) Komm vorbei, in deiner Gruppe oder alleine, und zeig, wieviel unnützes Wissen du auf dem Kasten hast. Die Gewinner:innen tanzen danach am glücklichsten!',
      },
      {
        name: 'Clara',
        time: '16:30–18:00',
      },
      {
        name: 'Diosmos',
        time: '18:30–20:00',
        tag: 'band',
        description: 'Diosmos is the music project of Bernese multi-instrumentalist Gilles Marti. With guitar, synthesizers and an unmistakable flair, he creates music that is simultaneously captivating, fascinating and dreamlike. His soundscapes invite you to immerse yourself in rhythms that move and atmospheres that inspire. Live, Diosmos is a unique experience that shows what live music is all about: impressive soundscapes are created in front of the audience using loops that captivate and amaze again and again. Gilles Marti shows how a solo artist can fill an entire stage with energy and depth, also with his unmistakable stage presence. Diosmos is no ordinary musical experience. It is an invitation to be carried away by pulsating sounds and impressive live energy - a moment that will linger for a long time.',
        spotify: 'https://open.spotify.com/intl-de/artist/047Escb5PziLkzmfWYF3BW',
        instagram: 'https://www.instagram.com/diosmosmusic/',
      },
      {
        name: 'Homemade Iscream',
        time: '21:00–22:30',
        tag: 'band',
        description: 'Offenherzig besingt HOMEMADE ISCREAM Alltagsprobleme in knackigen, sozialkritischen Songs. Mit Händen und Füssen spielen sie auf selbstgebauten Instrumenten die ganze Band zu zweit. Die DIY-Band rumpelt, stolpert und wummst, dass es eine helle Freude ist: ein Spektakel fürs Ohr, fürs Auge und für die Seele.',
        website: 'https://www.homemadeiscream.ch',
        instagram: 'https://www.instagram.com/homemade_iscream',
      },
      {
        name: 'Josquin',
        time: '23:30–01:00',
        tag: 'live',
        description: 'Originally from Paris and now based in Eindhoven, JOSQUINS is a self-taught live Tekno producer. Performing on hardware, improvising with samplers and synthesizers, each set is raw and unique. His music is heavily influenced by the free party culture and carries two sides: Hard driving energy accompanied by atmospheric and melodiclayers.',
        soundcloud: 'https://on.soundcloud.com/9fDox5I369xcZhYWEK',
        instagram: 'https://www.instagram.com/josquins',
      },
      {
        name: 'Hannes Di Lemma',
        time: '01:30–03:00',
        tag: 'live',
        description: 'Vier Synthesizer, ein Sequenzer und ein Mischpult: Hannes Di Lemma bringt mit seinem analogen Setup lebhaften Rave auf den Dancefloor. Der Sound ist geprägt von langsamen Tempi, groovigen Basslines und gewichtigen Chords.',
        soundcloud: 'https://soundcloud.com/hannesdilemma',
        instagram: 'https://www.instagram.com/hannesdilemma',
      },
      {
        name: 'Nina Wach',
        time: '03:00–05:00',
        description: 'storytelling somewhere between deconstructed club, psychedelic soundscapes, bass, and flickering vocal fragments',
        soundcloud: 'https://on.soundcloud.com/43y1aMUXPwI6290T4X',
      },
    ],
  },
]

export const sonntagStages: readonly LineupStageBlock[] = [
  {
    stageId: 'silsi',
    slots: [
      {
        name: 'Veryl East',
        time: '04:00–06:00',
        description: 'Veryl East is a DJ based in Zurich. He plays expressively textured trance and ambient, drawing inspiration from the contemporary Scandinavian scene and past Parisian nights alike. While helping to carve out a niche for trance in Switzerland, he has also appeared in mix series and line-ups beyond, near and far.',
        soundcloud: 'https://soundcloud.com/veryleast',
        instagram: 'https://www.instagram.com/veryl.east',
      },
      {
        name: 'Kabelsalat',
        time: '06:00–08:00',
      },
      {
        name: 'Shake',
        time: '09:00–11:00',
      },
      {
        name: 'Noch offen',
        time: '11:00–13:00',
        tag: 'offen',
      },
    ],
  },
  {
    stageId: 'mutowac',
    slots: [
      {
        name: 'Yuul & Lino',
        time: '05:00–07:00',
        description: 'Yuul and Lino skillfully curate high quality selections around textural and rather dubbymusic tied together by a decade long history of shared musical experiences and practice. Flow and atmospheres, repetition and disruption, early mornings or late nights, diy and hifi, they love music and each other. Yuul and Lino also actively shape musical spaces in Zurich as part of the collective Regula who do lovingly organized raves resisting the ever-growing commercialization of music and club culture.',
        soundcloud: 'https://on.soundcloud.com/q9CYjpUg8vOBcEsZZ7',
        instagram: 'https://www.instagram.com/regula.rec/',
      },
      {
        name: 'Loeggs b2b Karl Kaseltzer',
        time: '12:00–14:00',
        description: 'Seit langem befreundet und nach einem gemeinsamen bis in die Abendstunden gezogenen Afterhour-Set gemerkt, gemeinsam machts mehr Spass! Mit einer geteilten Leidenschaft für Minimal und Microhouse.',
        soundcloud: 'https://on.soundcloud.com/UUpRvI3DEwdadGm1BT',
      },
      {
        name: 'Leo Schick',
        time: '14:00–16:00',
      },
    ],
  },
  {
    stageId: 'aerodrom',
    slots: [
      {
        name: 'Yoga',
        time: '10:00–11:00',
        tag: 'workshop',
        description: 'Authentic Flow Ist eine somatische Yogapraxis, die eine achtsame Verbindung zu unserem Körper und der Aussenwelt ermöglicht. Das Ziel ist genau da, wo du gerade bist. Es ist eine direkte sinnliche Erfahrung von dir und dem Moment im jetzt begleitet von Musik. Es lädt dazu ein, wieder zuzuhören, zu spüren und bewusster in Kontakt mit uns selbst und unserer Umwelt zu treten. Die Stunde ist offen für alle Erfahrungslevel und alle Menschen, die sich Zeit für sich und ihren Körper nehmen wollen :)',
        instagram: 'https://www.instagram.com/print_flow_bern',
      },
      {
        name: 'Fayazaar',
        time: '11:30–12:30',
        tag: 'band',
        description: 'Mit Synths, Drum Machines, Handpan, Didgeridoo und mehr spielen Fayazaar zu zweit Live Electronic Music irgendwo zwischen Downtempo, Dub und Trance. Ihr Sound lebt von treibenden Beats, verträumten Klanglandschaften, Spontanität und ganz viel Live-Energie.',
        instagram: 'https://www.instagram.com/fayazaar_music',
      },
      {
        name: 'Jochen K & Jonny W',
        time: '13:30–15:00',
        tag: 'band',
      },
    ],
  },
]
