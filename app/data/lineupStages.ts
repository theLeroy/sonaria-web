/** Timetable slots with optional artist descriptions from the Artist Sheet. */

export type StageId = 'silsi' | 'mutowac' | 'aerodrom' | 'offspaces'

export const STAGE_ORDER: readonly StageId[] = [
  'silsi',
  'mutowac',
  'aerodrom',
  'offspaces',
] as const

export type SlotTag = 'vinyl' | 'live' | 'workshop' | 'band' | 'performance' | 'offen'

export type LineupSlot = Readonly<{
  name: string
  time: string
  tag?: SlotTag
  label?: string
  description?: Readonly<{
    de: string
    en: string
  }>
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
        name: 'wokey',
        time: '18:00–20:00',
        soundcloud: 'https://on.soundcloud.com/UB9nVcwlORF20FJzMo',
        instagram: 'https://www.instagram.com/wokey._',
      },
      {
        name: 'mae.be',
        time: '20:00–22:00',
      },
      {
        name: 'DJ Henk',
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
        description: {
          de: 'Noch so eine ellenlange Bio, die eine ganze künstlerische Persönlichkeit in einen unethisch kleinen Absatz pressen will – in 3..2..1.. sryxo glaubt nicht wirklich an Genres, vor allem weil sie sich nicht die Mühe machen will, eines auszuwählen. In manchen Sets taucht sie in Leftfield, Trip-Hop oder IDM ab, in anderen lässt sie die Wände mit Breaks, Jungle und Acid wackeln – oder lässt sich von treibendem Progressive House und 90er-Goa mitreissen. Gegen das, was sie gerne zugeben würde, hat sich zuletzt sogar ihr inneres Tech-House-Alter-Ego eingeschlichen. Sie trifft den Common Ground und gibt euch, was ihr euch wünscht – aber weil sie nicht nur den asphaltierten Strassen folgen mag, erwarten euch ein oder zwei Umwege, mitten hinein in die Gems, von denen ihr nicht wusstet, dass ihr sie braucht. Der Dancefloor, von dem sie träumt, ist euphorisch und fun, offen für Exploration und Innovation. Die Crowd, die sie verlangt, ist politisch: fürsorglich, empathisch und inklusiv. Ihr habt sie auf Festivals wie B-Sides, Gurtenfestival, Am Bach oder Schwing & Stampf erwischt; und in Clubs wie Klub Kegelbahn, Neubad, Kauz und Zentralwäscherei in Zürich, Luzern und anderen Ecken der Schweiz – internationale Präsenz: still loading, please stand by. Abseits der Decks ist sie Teil des Kollektivs Kon-Takt und macht die unglamouröse Arbeit von Booking, Kuratieren und gelegentlichem Streiten über Clubpolitik, weil irgendwer darüber nachdenken muss, während der Rest von uns nur die Toilette sucht. Danke, dass ihr dieses Kapitel gelesen habt – und akzeptiert, dass ihr jetzt noch weniger wisst, was euch erwartet... xoxo, sorriest girl.',
          en: 'Another long-ass bio trying to fit the entirety of an artistic personality in an unethically small paragraph coming in 3..2..1.. sryxo doesn\'t really believe in genres, mostly because she can\'t be bothered to pick one. In some sets she\'s dived into the niches of leftfield, trip-hop or IDM, in others, she\'s shaken the walls with breaks, jungle and acid, or even let herself be swept up in the currents of driving progressive house and 90’s goa. Against what she\'s comfortable admitting, recently even her inner tech-house alter ego has sneaked in. She\'ll touch on common ground, and give you what you wished for – but since she doesn\'t like to follow the plastered streets only, expect a detour or two, straight into the gems you didn\'t know you needed. The dancefloor she dreams of is euphoric and fun, open to exploration and innovation. The crowd she demands is political: caring, empathetic and inclusive. You\'ll have caught her at festivals like B-Sides, Gurtenfestival, Am Bach or Schwing & Stampf; and in clubs like Klub Kegelbahn, Neubad, Kauz and Zentralwäscherei across Zurich, Lucerne and other corners of Switzerland – international presence still loading, please stand by. Off the decks, she\'s part of the collective Kon-Takt, doing the unglamorous work of booking, curating and occasionally arguing about club politics, because someone has to think about this stuff while the rest of us are just trying to find the bathroom. Thanks for reading this chapter, and accepting that now you know even less what to expect than before... xoxo, sorriest girl.',
        },
        soundcloud: 'https://on.soundcloud.com/ueNpbUo5SABHmdPJzz',
        instagram: 'https://www.instagram.com/_sryxo/',
      },
      {
        name: 'ZELEV',
        time: '18:00–20:00',
        description: {
          de: 'Zelev pendelt zwischen Zug und Zürich und bringt eine lange Geschichte mit Musik mit: Chor, Gesang, Piano, Songwriting — über 15 Jahre Feingefühl für Stimme, Melodie und alles, was zwischen den Tönen passiert. Bevor der Club dazukam, war Musik für sie längst Sprache, Rückzugsort und innerer Puls. Seit 2022 spielt sie in Clubs und auf Festivals in der Schweiz, Berlin, London und Vietnam und hat sich dabei eine eigene Spur gelegt. Ihre Sets bewegen sich durch tiefe Basslines, meditative Layer, perkussive Funken und Tracks mit Geheimfach — sinnlich, wach und nie zu offensichtlich. Musik, die Raum lässt, aber trotzdem Bewegung auslöst. Als leidenschaftliche Diggerin zieht es Zelev zum Unbekannten: zu Sounds, die selten wirken, aber sofort andocken; zu Tracks, die nicht alles verraten und trotzdem hängen bleiben. Kein Genre-Käfig, kein Standardprogramm — eher ein feines Gespür für Atmosphäre, Körper und den Moment, in dem Menschen, Musik und Raum kurz dieselbe Sprache sprechen. Zelev sucht das Unerwartete und macht es zugänglich. Sound für offene Ohren, schnelle Füsse und weiche Knie.',
          en: 'Zelev moves between Zug and Zurich and brings a long history with music: choir, singing, piano, songwriting — over 15 years of sensitivity for voice, melody and everything that happens between the notes. Before the club came along, music had long been language, refuge and inner pulse for her. Since 2022 she has been playing clubs and festivals in Switzerland, Berlin, London and Vietnam, carving out a path of her own. Her sets move through deep basslines, meditative layers, percussive sparks and tracks with a secret compartment — sensual, awake and never too obvious. Music that leaves space, yet still makes bodies move. As a passionate digger, Zelev is drawn to the unknown: to sounds that feel rare but lock in immediately; to tracks that don\'t give everything away and still stick. No genre cage, no standard programme — rather a fine sense for atmosphere, body and the moment when people, music and space briefly speak the same language. Zelev seeks the unexpected and makes it accessible. Sound for open ears, quick feet and soft knees.',
        },
        soundcloud: 'https://soundcloud.com/zelevch/popular-tracks',
        instagram: 'https://www.instagram.com/zelev____/',
      },
      {
        name: 'Bernd Bugatti',
        time: '20:00–22:00',
        description: {
          de: 'Wer hinter dem Namen einen Autohändler mit fragwürdigen Leasingangeboten vermutet, liegt komplett richtig. Neben dubiosen Verträgen kann Bernd aber auch Musik und liefert als Teil des Münchner Kollektivs "Folge der Wolke" stets groovigen Sound ohne Rücksicht auf Genregrenzen. Dieses Mal erwarten euch eine Mischung aus Minimal, Tech House und Indie Dance, oder allem, was sich gut anfühlt. Freut euch auf die "Geheimwaffe" aus Berlin, this is going to be BERNdig 🕺',
          en: 'If you suspect a car dealer with shady leasing deals behind the name, you\'re completely right. Beyond dubious contracts, Bernd can also do music — and as part of the Munich collective "Folge der Wolke" he always delivers groovy sound with no regard for genre borders. This time expect a mix of minimal, tech house and indie dance, or whatever feels good. Get ready for the "secret weapon" from Berlin — this is going to be BERNdig 🕺',
        },
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
        description: {
          de: 'Einst war sie als Clausette La Trine die bekannteste Drag Queen von Bern, nun setzt sie sich als DJ in Szene. Musikalisch mag sie es dramatisch und dreckig. Die Diva hinter dem DJ-Pult weiss dank Ihrer langjährigen Erfahrung im Tingeln durch Schwulenbars und Undergroundclubs nämlich genau, was die Meute ins Schwitzen bringt. Ihre Sets sind eine energiereiche Mischung aus Indie Dance, Dark and Electronic Disco.',
          en: 'Once known as Clausette La Trine, Bern\'s most famous drag queen, she now takes the stage as a DJ. Musically she likes it dramatic and dirty. Thanks to years of touring gay bars and underground clubs, the diva behind the decks knows exactly what makes the crowd sweat. Her sets are an energetic mix of indie dance, dark and electronic disco.',
        },
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
        name: 'eggs and tiaras',
        time: '21:00–22:00',
        tag: 'band',
        description: {
          de: 'Das Electro-Clashpop-Duo eggs and tiaras aus Zürich und Neuchâtel erzählt mit einem Hauch von Provokation die teils düsteren Geschichten des Alltags. Über harten Kicks und verspielten Synthesizer-Melodien legen sich zwei Stimmen mit Texten auf Französisch, Englisch und Deutsch. eggs and tiaras spielen mit Gegensätzen: Sie bewegen sich zwischen ernsten Themen und scharfer Ironie, brechen bewusst mit Erwartungen und tragen dabei stets eine mitreissende Energie nach vorne – mit dem Ziel, die Freude am Widerstand zu teilen.',
          en: 'The electro clash-pop duo eggs and tiaras from Zurich and Neuchâtel tell everyday stories — sometimes dark — with a hint of provocation. Over hard kicks and playful synth melodies, two voices layer lyrics in French, English and German. eggs and tiaras play with contrasts: they move between serious themes and sharp irony, deliberately break expectations and always push a driving energy forward — aiming to share the joy of resistance.',
        },
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
  {
    stageId: 'offspaces',
    slots: [
      {
        name: 'Tooth Gems',
        time: '',
      },
      {
        name: 'Amoras Trap',
        time: '',
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
        description: {
          de: 'Hinter dem Namen civic3mille steckt Madani Sakho, ein junger DJ aus Bern, dem Musik von Anfang an in die DNA geschrieben war. Als kleiner Junge haben ihn seine Eltern in eine unglaublich reiche Klangwelt eingeführt – Blues, Jazz, Salsa, House, um nur ein paar zu nennen. Diese frühe, neugierige Beziehung zur Musik prägt bis heute alles an seiner Spielweise. Müsste man seinen Stil in einem Wort beschreiben, wäre es Odyssey. Er nimmt die Crowd mit auf eine lange, abenteuerliche Reise, bei der man nie ganz weiss, wohin es als Nächstes geht. Seine Sets überschreiten Genregrenzen, gebaut um eine Trackauswahl, die immer überraschend und immer intentional ist. Das Ziel: Leute aus dem Konzept bringen und mit jedem Transition tiefer hineinziehen.',
          en: 'Behind the name civic3mille is Madani Sakho, a young DJ from Bern who had music written into his DNA from the very start. As a little boy, his parents introduced him to an incredibly rich range of sounds. Blues, Jazz, Salsa, House to name a few. That early, curious relationship with music still shapes everything about the way he plays today. If you had to describe his style in a single word, it would be odyssey. He takes the crowd on a long, adventurous journey where you never quite know where it\'s heading next. His sets reach beyond genre boundaries, built around a track selection that is always surprising, always intentional. The goal is to catch people off guard and pull them in deeper with every transition.',
        },
        soundcloud: 'https://soundcloud.com/civic3mille',
        instagram: 'https://www.instagram.com/civic3mille/',
      },
      {
        name: 'Mad Moiselle',
        time: '16:30–18:00',
      },
      {
        name: 'Mount Thizzz',
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
        name: 'RTM feat. vert_31',
        time: '17:00–19:00',
        soundcloud: 'https://on.soundcloud.com/OkgSh1HsZfIsLM32Vy',
      },
      {
        name: 'Dj Nebelmaschine, LariFari & Reznap',
        time: '19:00–21:00',
        tag: 'live',
        description: {
          de: 'LariFari packt die Bänger mit den sassy Vocals aus, DJ Nebelmaschine fuhrwerkt wild an den Turntables bis sich die Töne verbiegen und Reznap untermalt das Ganze virtuos mit seinem Waldhorn und am Synthesizer. Was dabei rauskommt? Eine wilde Mischung aus Indie Dance, Tech House und Deep-Tech mit fetten Basslines, verspulten Vocals und grandiosen Live Elementen - bald auch auf einem Berg in deiner Nähe!',
          en: 'LariFari drops the bangers with sassy vocals, DJ Nebelmaschine tears into the turntables until the tones bend, and Reznap underlines it all virtuously on French horn and synth. What comes out? A wild mix of indie dance, tech house and deep tech with fat basslines, twisted vocals and grand live elements — soon also on a mountain near you!',
        },
        soundcloud: 'https://soundcloud.com/dj_nebelmaschine',
        instagram: 'https://www.instagram.com/dj.nebelmaschine/',
      },
      {
        name: 'Chora',
        time: '21:00–23:00',
      },
      {
        name: 'acidgurke',
        time: '23:00–01:00',
        description: {
          de: 'acidgurke ist ein tiefer Trip durch die Sphären des musikalischen Untergrunds. Ihre Sets sind zugleich melodisch und perkussiv, hypnotisch und aufweckend, wellenartig und impulsiv. Für ihre Reise auf dem Sonaria 2026 hat acidgurke einige Überraschungen in ihrer Wundertüte. Eines kann sie jedoch jetzt schon verraten: Diese Reise kennt nur eine Richtung und das ist vorwärts.',
          en: 'acidgurke is a deep trip through the spheres of the musical underground. Her sets are at once melodic and percussive, hypnotic and awakening, wave-like and impulsive. For her journey at Sonaria 2026, acidgurke has a few surprises in her bag of tricks. One thing she can already reveal: this journey only goes one way — forward.',
        },
        soundcloud: 'https://soundcloud.com/ae-b-11616851',
        instagram: 'https://www.instagram.com/dj_acidgurke/',
      },
      {
        name: 'Akra Ondo',
        time: '01:00–03:00',
        description: {
          de: 'Musikalisch hat sich Akra Ondo über organische Downtempo-Sounds und Breakbeats hin zu House, Acidhouse, Trance und Techno entwickelt. Heute liegt ihr Fokus auf deepen, hypnotischen Klangwelten, die introspektiv, psychedelisch und nischig sind. Die DJ Sets von Akra Ondo sind bekannt für ihre sorgfältige Kuration, welche die Zuhörenden mitnimmt und einlädt auf eine Reise. Treibende Basslines, ausgeklügelte Rhythmen, verspielte Geräusche und warm umhüllende Flächen laden ein mit sich und der Umwelt in Verbindung zu kommen.',
          en: 'Musically, Akra Ondo has evolved from organic downtempo sounds and breakbeats toward house, acid house, trance and techno. Today her focus is on deep, hypnotic sound worlds that are introspective, psychedelic and niche. Akra Ondo\'s DJ sets are known for careful curation that takes listeners along and invites them on a journey. Driving basslines, intricate rhythms, playful noises and warmly enveloping pads invite you to connect with yourself and your surroundings.',
        },
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
        description: {
          de: 'Authentic Flow Ist eine somatische Yogapraxis, die eine achtsame Verbindung zu unserem Körper und der Aussenwelt ermöglicht. Das Ziel ist genau da, wo du gerade bist. Es ist eine direkte sinnliche Erfahrung von dir und dem Moment im jetzt begleitet von Musik. Es lädt dazu ein, wieder zuzuhören, zu spüren und bewusster in Kontakt mit uns selbst und unserer Umwelt zu treten. Die Stunde ist offen für alle Erfahrungslevel und alle Menschen, die sich Zeit für sich und ihren Körper nehmen wollen :)',
          en: 'Authentic Flow is a somatic yoga practice that enables a mindful connection to our body and the outside world. The goal is exactly where you are right now. It is a direct sensory experience of yourself and the present moment, accompanied by music. It invites you to listen again, to feel, and to come into more conscious contact with yourself and your surroundings. The class is open to all experience levels and to anyone who wants to take time for themselves and their body :)',
        },
        instagram: 'https://www.instagram.com/print_flow_bern',
      },
      {
        name: 'Sexualisierte Gewalt passiert – auf welcher Seite stehst du als cis Mann?',
        time: '11:00–13:00',
        tag: 'workshop',
        description: {
          de: 'Scheissverhalten passiert überall – auch auf dem Sonaria. Wie können wir eine Kultur des Hinschauens entwickeln? Interaktiver Workshop mit Gruppendiskussionen – cis Männer erwünscht, all genders welcome.',
          en: 'Shitty behaviour happens everywhere — including at Sonaria. How can we build a culture of paying attention? Interactive workshop with group discussions — cis men encouraged, all genders welcome.',
        },
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
        description: {
          de: 'Gehirnzellen aktivieren ist die beste Vorbereitung für eine wilde Ravenacht, das wussten bereits Römer:innen ( - oder so?) Komm vorbei, in deiner Gruppe oder alleine, und zeig, wieviel unnützes Wissen du auf dem Kasten hast. Die Gewinner:innen tanzen danach am glücklichsten!',
          en: 'Activating brain cells is the best prep for a wild rave night — the Romans already knew that (or so they say?). Come by, with your group or alone, and show how much useless knowledge you\'ve got. The winners will dance happiest afterwards!',
        },
      },
      {
        name: 'Clara',
        time: '16:30–18:00',
      },
      {
        name: 'Diosmos',
        time: '18:30–20:00',
        tag: 'band',
        description: {
          de: 'Diosmos ist das Musikprojekt des Berner Multiinstrumentalisten Gilles Marti. Mit Gitarre, Synthesizern und einem unverkennbaren Flair schafft er Musik, die zugleich fesselnd, faszinierend und traumhaft ist. Seine Klanglandschaften laden ein, in Rhythmen einzutauchen, die bewegen, und Atmosphären, die inspirieren. Live ist Diosmos ein einzigartiges Erlebnis davon, was Live-Musik ausmacht: Beeindruckende Soundscapes entstehen vor dem Publikum mit Loops, die immer wieder fesseln und staunen lassen. Gilles Marti zeigt, wie ein Solo-Artist eine ganze Bühne mit Energie und Tiefe füllen kann – auch mit seiner unverkennbaren Bühnenpräsenz. Diosmos ist kein gewöhnliches Musikerlebnis. Es ist eine Einladung, sich von pulsierenden Sounds und beeindruckender Live-Energie tragen zu lassen – ein Moment, der lange nachhallt.',
          en: 'Diosmos is the music project of Bernese multi-instrumentalist Gilles Marti. With guitar, synthesizers and an unmistakable flair, he creates music that is simultaneously captivating, fascinating and dreamlike. His soundscapes invite you to immerse yourself in rhythms that move and atmospheres that inspire. Live, Diosmos is a unique experience that shows what live music is all about: impressive soundscapes are created in front of the audience using loops that captivate and amaze again and again. Gilles Marti shows how a solo artist can fill an entire stage with energy and depth, also with his unmistakable stage presence. Diosmos is no ordinary musical experience. It is an invitation to be carried away by pulsating sounds and impressive live energy - a moment that will linger for a long time.',
        },
        spotify: 'https://open.spotify.com/intl-de/artist/047Escb5PziLkzmfWYF3BW',
        instagram: 'https://www.instagram.com/diosmosmusic/',
      },
      {
        name: 'Homemade Iscream',
        time: '21:00–22:30',
        tag: 'band',
        description: {
          de: 'Offenherzig besingt HOMEMADE ISCREAM Alltagsprobleme in knackigen, sozialkritischen Songs. Mit Händen und Füssen spielen sie auf selbstgebauten Instrumenten die ganze Band zu zweit. Die DIY-Band rumpelt, stolpert und wummst, dass es eine helle Freude ist: ein Spektakel fürs Ohr, fürs Auge und für die Seele.',
          en: 'With open hearts, HOMEMADE ISCREAM sings everyday problems into snappy, socially critical songs. With hands and feet they play an entire band as a duo on self-built instruments. The DIY band rumble, stumble and thump with pure joy: a spectacle for ear, eye and soul.',
        },
        website: 'https://www.homemadeiscream.ch',
        instagram: 'https://www.instagram.com/homemade_iscream',
      },
      {
        name: 'JOSQUINS',
        time: '23:30–01:00',
        tag: 'live',
        description: {
          de: 'Ursprünglich aus Paris und heute in Eindhoven zu Hause, ist JOSQUINS ein autodidaktischer Live-Tekno-Producer. Er spielt auf Hardware und improvisiert mit Samplern und Synthesizern – jedes Set ist roh und einzigartig. Seine Musik ist stark von Free-Party-Kultur geprägt und hat zwei Seiten: harte, treibende Energie, begleitet von atmosphärischen und melodischen Layern.',
          en: 'Originally from Paris and now based in Eindhoven, JOSQUINS is a self-taught live Tekno producer. Performing on hardware, improvising with samplers and synthesizers, each set is raw and unique. His music is heavily influenced by the free party culture and carries two sides: Hard driving energy accompanied by atmospheric and melodic layers.',
        },
        soundcloud: 'https://on.soundcloud.com/9fDox5I369xcZhYWEK',
        instagram: 'https://www.instagram.com/josquins',
      },
      {
        name: 'Hannes Di Lemma',
        time: '01:30–03:00',
        tag: 'live',
        description: {
          de: 'Vier Synthesizer, ein Sequenzer und ein Mischpult: Hannes Di Lemma bringt mit seinem analogen Setup lebhaften Rave auf den Dancefloor. Der Sound ist geprägt von langsamen Tempi, groovigen Basslines und gewichtigen Chords.',
          en: 'Four synthesizers, a sequencer and a mixer: with his analogue setup, Hannes Di Lemma brings lively rave to the dancefloor. The sound is shaped by slow tempos, groovy basslines and weighty chords.',
        },
        soundcloud: 'https://soundcloud.com/hannesdilemma',
        instagram: 'https://www.instagram.com/hannesdilemma',
      },
      {
        name: 'Nina Wach',
        time: '03:00–05:00',
        description: {
          de: 'Storytelling irgendwo zwischen deconstructed Club, psychedelischen Soundscapes, Bass und flackernden Vocal-Fragmenten',
          en: 'storytelling somewhere between deconstructed club, psychedelic soundscapes, bass, and flickering vocal fragments',
        },
        soundcloud: 'https://on.soundcloud.com/43y1aMUXPwI6290T4X',
      },
    ],
  },
  {
    stageId: 'offspaces',
    slots: [
      {
        name: 'Kuscheln & Knutschen',
        time: '15:00–17:00',
        tag: 'workshop',
        label: '[Vorspiel Kollektiv | Bern]',
        description: {
          de: 'Vorspiel ist ein sexpositives Kollektiv aus Bern. Wir schaffen Orte, an denen Konsens, Verbindung, Entdeckungslust und Achtsamkeit wachsen und gelebt werden dürfen. Der Workshop kuscheln & knutschen besteht aus zwei ineinanderfliessenden Teilen. Zunächst öffnen wir einen etwas ruhigeren, theoretischen Raum, in dem wir Konsens über praktische, körperlich erfahrbare Methoden vermitteln. Kleine Übungen laden dazu ein, sich selbst und den Raum bewusster wahrzunehmen, erste Begegnungen dürfen entstehen und Vertrauen wird aufgebaut. Im zweiten Teil darf sich der Raum öffnen: ein Open Space für alle, die möchten. Hier darf gekuschelt, vielleicht auch geknutscht werden, immer getragen von Achtsamkeit und Konsens. Dabei ist es uns besonders wichtig, die Stimmung und Bedürfnisse der Teilnehmer*innen feinfühlig aufzugreifen. Der Ablauf bleibt deshalb bewusst flexibel: Ein Open Space kann sich ebenso gut in eine gemeinsame Gesprächsrunde verwandeln, wenn der Moment danach fragt. Jede*r entscheidet jederzeit selbst, was sich stimmig anfühlt und wo die eigenen Grenzen liegen. Vielleicht nimmst du neue Impulse mit, vielleicht einfach ein neues Gefühl von Verbindung, zu dir selbst oder zu anderen. Wir beginnen gemeinsam. Der Workshop darf jederzeit früher verlassen werden. Während des gesamten Workshops sind Awareness-Personen von Vorspiel anwesend und ansprechbar. Zudem gilt das Awareness-Konzept des Sonaria auch für diesen Raum.',
          en: 'Vorspiel is a sex-positive collective from Bern. We create spaces where consent, connection, curiosity and mindfulness can grow and be lived. The cuddle & kiss workshop has two flowing parts. First we open a quieter, more theoretical space where we teach consent through practical, embodied methods. Small exercises invite you to perceive yourself and the room more consciously; first encounters may arise and trust is built. In the second part the space can open: an open space for everyone who wants. Here you may cuddle, maybe even kiss — always held by mindfulness and consent. It is especially important to us to sense the mood and needs of participants carefully. The flow stays intentionally flexible: an open space can just as well turn into a shared conversation if the moment asks for it. Everyone decides at any time what feels right and where their boundaries are. Maybe you take new impulses with you, maybe simply a new sense of connection — to yourself or to others. We begin together. You may leave the workshop early at any time. Awareness people from Vorspiel are present and approachable throughout. Sonaria\'s awareness concept also applies in this space.',
        },
        instagram: 'https://www.instagram.com/vor.spiel',
      },
      {
        name: 'Rave it Save',
        time: '',
      },
      {
        name: 'Hannjuschka & Floh',
        time: '',
        tag: 'workshop',
      },
      {
        name: 'Tripity Happening',
        time: '',
      },
      {
        name: 'Amoras Trap',
        time: '',
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
        description: {
          de: 'Veryl East ist ein DJ aus Zürich. Er spielt expressiv texturierten Trance und Ambient und lässt sich von der zeitgenössischen skandinavischen Szene ebenso inspirieren wie von vergangenen Pariser Nächten. Während er in der Schweiz eine Nische für Trance mitprägt, ist er auch in Mix-Serien und Line-ups nah und fern unterwegs.',
          en: 'Veryl East is a DJ based in Zurich. He plays expressively textured trance and ambient, drawing inspiration from the contemporary Scandinavian scene and past Parisian nights alike. While helping to carve out a niche for trance in Switzerland, he has also appeared in mix series and line-ups beyond, near and far.',
        },
        soundcloud: 'https://soundcloud.com/veryleast',
        instagram: 'https://www.instagram.com/veryl.east',
      },
      {
        name: 'Kabelsalat',
        time: '06:00–08:00',
      },
      {
        name: 'Schacke99',
        time: '09:00–11:00',
      },
      {
        name: 'amygdala',
        time: '11:00–13:00',
        soundcloud: 'https://soundcloud.com/amygdalaorexis/tracks',
      },
    ],
  },
  {
    stageId: 'mutowac',
    slots: [
      {
        name: 'Yuul & Lino',
        time: '05:00–07:00',
        description: {
          de: 'Yuul und Lino kuratieren gekonnt hochwertige Selections rund um texturelle, eher dubbige Musik – zusammengehalten von einer jahrzehntelangen gemeinsamen musikalischen Praxis. Flow und Atmosphären, Repetition und Disruption, frühe Morgen oder späte Nächte, DIY und HiFi: Sie lieben Musik und einander. Als Teil des Kollektivs Regula gestalten Yuul und Lino ausserdem aktiv musikalische Räume in Zürich und organisieren liebevoll Raves, die sich der wachsenden Kommerzialisierung von Musik und Clubkultur widersetzen.',
          en: 'Yuul and Lino skillfully curate high quality selections around textural and rather dubby music tied together by a decade long history of shared musical experiences and practice. Flow and atmospheres, repetition and disruption, early mornings or late nights, diy and hifi, they love music and each other. Yuul and Lino also actively shape musical spaces in Zurich as part of the collective Regula who do lovingly organized raves resisting the ever-growing commercialization of music and club culture.',
        },
        soundcloud: 'https://on.soundcloud.com/q9CYjpUg8vOBcEsZZ7',
        instagram: 'https://www.instagram.com/regula.rec/',
      },
      {
        name: 'Karl Kaseltzer b2b Loeggs',
        time: '12:00–14:00',
        description: {
          de: 'Seit langem befreundet und nach einem gemeinsamen bis in die Abendstunden gezogenen Afterhour-Set gemerkt, gemeinsam machts mehr Spass! Mit einer geteilten Leidenschaft für Minimal und Microhouse.',
          en: 'Friends for a long time — and after a shared afterhour set that stretched into the evening hours, they realised: together it\'s more fun! United by a shared passion for minimal and microhouse.',
        },
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
        description: {
          de: 'Authentic Flow Ist eine somatische Yogapraxis, die eine achtsame Verbindung zu unserem Körper und der Aussenwelt ermöglicht. Das Ziel ist genau da, wo du gerade bist. Es ist eine direkte sinnliche Erfahrung von dir und dem Moment im jetzt begleitet von Musik. Es lädt dazu ein, wieder zuzuhören, zu spüren und bewusster in Kontakt mit uns selbst und unserer Umwelt zu treten. Die Stunde ist offen für alle Erfahrungslevel und alle Menschen, die sich Zeit für sich und ihren Körper nehmen wollen :)',
          en: 'Authentic Flow is a somatic yoga practice that enables a mindful connection to our body and the outside world. The goal is exactly where you are right now. It is a direct sensory experience of yourself and the present moment, accompanied by music. It invites you to listen again, to feel, and to come into more conscious contact with yourself and your surroundings. The class is open to all experience levels and to anyone who wants to take time for themselves and their body :)',
        },
        instagram: 'https://www.instagram.com/print_flow_bern',
      },
      {
        name: 'Fayazaar',
        time: '11:30–12:30',
        tag: 'band',
        description: {
          de: 'Mit Synths, Drum Machines, Handpan, Didgeridoo und mehr spielen Fayazaar zu zweit Live Electronic Music irgendwo zwischen Downtempo, Dub und Trance. Ihr Sound lebt von treibenden Beats, verträumten Klanglandschaften, Spontanität und ganz viel Live-Energie.',
          en: 'With synths, drum machines, handpan, didgeridoo and more, Fayazaar play live electronic music as a duo somewhere between downtempo, dub and trance. Their sound thrives on driving beats, dreamy soundscapes, spontaneity and lots of live energy.',
        },
        instagram: 'https://www.instagram.com/fayazaar_music',
      },
      {
        name: 'Jochen K & Jonny W',
        time: '13:30–15:00',
        tag: 'band',
      },
    ],
  },
  {
    stageId: 'offspaces',
    slots: [],
  },
]
