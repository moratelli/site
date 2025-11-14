import { Certi } from './Milestones/Certi'
import { Philips } from './Milestones/Philips'
import { Senai } from './Milestones/Senai'
import { Today } from './Milestones/Today'
import { Trackli } from './Milestones/Trackli'
import { Zallpy } from './Milestones/Zallpy'

export const MyDevJourney = () => {
  return (
    <section className="journey">
      <h2 className="section-title">My developer journey</h2>
      <Senai />
      <Trackli />
      <Certi />
      <Philips />
      <Zallpy />
      <Today />
    </section>
  )
}
