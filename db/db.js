const db = {
    testimonials: [
        { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
        { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
        { id: 3, author: 'Marcin Doe', text: 'Their food is ok.' },
        { id: 4, author: 'Linda Evans', text: 'Ok place, good prices.' },
        { id: 5, author: 'Lindy Johns', text: 'Nice place in nice part of town.' },
        { id: 6, author: 'Indy Johnson', text: 'Nice place to eat when you feel very hungry.' },
        { id: 7, author: 'Danny California', text: 'Good service.' },
        { id: 8, author: 'Mike Hansen', text: 'They do nice stuff.' },
        { id: 9, author: 'Dowg Bounty', text: 'Best people in town.' },
    ],
    concerts: [
        { id: 1, performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' },
        { id: 2, performer: 'Rebekah Parker', genre: 'R&B', price: 25, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' },
        { id: 3, performer: 'Maybell Haley', genre: 'Pop', price: 40, day: 1, image: '/img/uploads/hdfh42sd213.jpg' },
    ],
    seats: [
        { id: 1, day: 1, seat: 3, client: 'Amanda Doe', email: 'amandadoe@example.com' },
        { id: 2, day: 1, seat: 9, client: 'Curtis Johnson', email: 'curtisj@example.com' },
        { id: 3, day: 1, seat: 10, client: 'Felix McManara', email: 'felxim98@example.com' },
        { id: 4, day: 1, seat: 26, client: 'Fauna Keithrins', email: 'mefauna312@example.com' },
        { id: 5, day: 1, seat: 27, client: 'Donald Keithrins', email: 'poldave111@example.com' },
        { id: 6, day: 2, seat: 1, client: 'Felix McManara', email: 'felxim98@example.com' },
        { id: 7, day: 2, seat: 2, client: 'Molier Lo Celso', email: 'moiler.lo.celso@example.com' },
        { id: 8, day: 2, seat: 27, client: 'Marco Moliero', email: 'development.ide@example.com' },
    ],
};

module.exports = db;