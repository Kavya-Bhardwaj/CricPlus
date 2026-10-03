import { getStandings } from "@/lib/cricket";

export default async function StandingsPage() {
  const standings = await getStandings();

  return (
    <div className="stack-xl">
      <section className="panel">
        <p className="meta-line">{standings.demo ? "Demo table" : "Live standings"}</p>
        <h2>Tables</h2>
        <p className="meta-line">Updated: {new Date(standings.lastUpdated).toLocaleString()}</p>
      </section>

      <section className="panel" aria-label="Standings table">
        <div className="timeline">
          {standings.data.map((row, index) => (
            <article key={row.team}>
              <p>
                {index + 1}. {row.team}
              </p>
              <small>
                P {row.played} · W {row.won} · L {row.lost} · PTS {row.points} · NRR {row.nrr}
              </small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
