export const datum = (t) => {
  // gibt ein Datum im deutschen Format zurück
  try {
    return Date.parse(t).toLocaleDateString('de', {day: '2-digit', month: '2-digit', year: 'numeric'})
  } catch (e) {console.log(e); return}
}
export const versetzungsvermerk = (s, hj, agz=null) => {
  // gibt, wenn vorhanden den passenden Vermerk zurück
  // wenn es ein agz ist und kein Konferenzdatum feststeht
  if (agz && !hj.Konferenzdatum) return
  let vermerk = ''
  if (hj.Abschnitt === 2 || s.Klasse.startsWith('H')) {
    switch (hj.VersetzungKrz) {
      case 'N': vermerk = `Nicht versetzt laut Konferenzbeschluss vom ${datum(hj.Konferenzdatum)}`
      case 'V': vermerk = `Versetzt laut Konferenzbeschluss vom ${datum(hj.Konferenzdatum)}`
      default:  vermerk = 'Kein Versetzungsvermerk hinterlegt'
    }
  }
  return vermerk
}
export const bemerkungen = (hj) => {
  return hj.ZeugnisBem ? hj.ZeugnisBem.replace('\r\n', '<br/>') : 'keine'
}
export const volljaehrigBei = (s, datum) => {
  // gibt an, ob der Schüler *s* zu einem Zeitpunkt *datum* volljährig war
  try {
  const g = new Date(s.Geburtsdatum)
  const d = new Date(datum)
  const volljaehrig = d.getFullYear() - g.getFullYear() - ((d.getMonth() > g.getMonth() || (d.getMonth() == g.getMonth() && d.getDay() >= g.getDay()) ? 0 : 1)) >= 18
  return volljaehrig
  } catch (e) {console.log(e); return}
}
export const schulform = (s) => {
  switch (s.ASDSchulform[0]) {
    case 'B': return 'Berufsfachschule'
  }
}