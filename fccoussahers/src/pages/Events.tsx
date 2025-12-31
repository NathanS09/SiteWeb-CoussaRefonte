import React, { useMemo, useState } from 'react';
import { useClubData } from '../context/ClubContext';
import { getPbImageUrl } from '../api';
import { X } from 'lucide-react';
import EventCard from '../components/Events/EventCard'; // <--- Import ici

const Events: React.FC = () => {
  const { events: rawEvents } = useClubData();
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

    console.log('Raw events from context:', rawEvents);

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    const processedEvents = rawEvents.map(evt => {
      const start = new Date(evt.start_date);
      const end = evt.end_date ? new Date(evt.end_date) : start;
      return { ...evt,
         startObj: start, 
         endObj: end, 
         isFinished: end < now, 
         image: evt.image ? getPbImageUrl(evt, evt.image) : null };
    });

    return {
      upcomingEvents: processedEvents.filter(e => !e.isFinished).sort((a,b) => a.startObj.getTime() - b.startObj.getTime()),
      pastEvents: processedEvents.filter(e => e.isFinished).sort((a,b) => b.endObj.getTime() - a.endObj.getTime())
    };
  }, [rawEvents]);


  // On garde la fonction de formatage ici uniquement pour la Modal
  const formatDateRange = (start: Date, end: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const startDateStr = start.toLocaleDateString('fr-FR', options);
    const endDateStr = end.toLocaleDateString('fr-FR', options);
    return startDateStr === endDateStr ? `Le ${startDateStr}` : `Du ${startDateStr.split(' 20')[0]} au ${endDateStr}`;
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Agenda du Club</h1>
          <p className="text-lg">Toutes les dates importantes de la vie du FCCH.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 border-b-2 border-secondary pb-2 inline-block">
            📅 Événements à venir
          </h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map(evt => (
                <EventCard key={evt.id} evt={evt} onClick={setSelectedEvent} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100 text-gray-500">
              Aucun événement prévu.
            </div>
          )}
        </section>

        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-500 mb-6 border-b-2 border-gray-300 pb-2 inline-block">
              📜 Événements passés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-75 grayscale-[50%] hover:grayscale-0 transition-all">
              {pastEvents.map(evt => (
                <EventCard key={evt.id} evt={evt} onClick={setSelectedEvent} />
              ))}
            </div>
          </section>
        )}
      </div>

        {/* --- MODAL (Inchangée) --- */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white text-gray-800 z-10">
              <X size={24} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-100 flex items-center justify-center">
                {selectedEvent.image && (
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="max-h-[60vh] md:max-h-[80vh] w-auto object-contain" />
                )}
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-bold mb-4 self-start">
                  {formatDateRange(selectedEvent.startObj, selectedEvent.endObj)}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{selectedEvent.title}</h2>
                <div className="prose prose-lg text-gray-700 max-w-none" dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Events;