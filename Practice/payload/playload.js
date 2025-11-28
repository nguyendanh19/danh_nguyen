
class Payload {
    static postUser(name, email, pass) {
        return {
            "name": `${name}`,
            "email": `${email}`,
            "password": `${pass}`,
            "title": "Mr",
            "birth_date": "15",
            "birth_month": "08",
            "birth_year": "1990",
            "firstname": "John",
            "lastname": "Doe",
            "company": "TechCorp",
            "address1": "123 Main St",
            "address2": "Suite 456",
            "country": "United States",
            "zipcode": "10001",
            "state": "New York",
            "city": "New York",
            "mobile_number": "1234567890"
        };
    };

    static getUser(email) {
        return {
            "email": `${email}`
        }
    };

    static deleteUser(email, password) {
        return {
            "email": `${email}`,
            "password": `${password}`
        }
    }


}

module.exports = Payload;
