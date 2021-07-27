import React, { useEffect, useState } from 'react';

const parse = (raw) => {
    const values = raw.split(/\r\n| /).map(value => value.split(':')); // [['ecl', 'amb'], ['pid', '690616023'], ...], ... ]
    return values.reduce((card, value) => ({ ...card, [value[0]]: value[1] }), {}); // [{ "ecl": "amb", "pid": "690616023", ... }, ...]
};

const validation = {
    pid: /^\d{9}$/,
    byr: /^19[2-9][0-9]|200[0-2]$/,
    iyr: /^201[0-9]|202[0-1]$/,
    eyr: /^202[0-9]|203[0-1]$/,
    hgt: /^[5-9][0-9]cm|1[0-9][0-9]cm|2[0-1][0-9]cm|220cm|[2-8][0-9]in|90in$/,
    hcl: /^#[0-9a-f]{6}$/,
    ecl: /^grn|blu|brn|hzl|oth|amb|gry$/
};

const Card = ({ raw }) => {
    const card = parse(raw);
    const { pid, byr, iyr, eyr, hgt, hcl, ecl, cid } = card;
    return <div style={{ margin: 4 }}>
        <label style={{ margin: 4 }}><b style={{ color: pid && validation.pid.test(pid) ? 'green' : 'red' }}>pid:</b>{pid || <i>N/A</i>}</label>
        <label style={{ margin: 4 }}><b style={{ color: byr && validation.byr.test(byr) ? 'green' : 'red' }}>byr:</b>{byr || <i>N/A</i>}</label>
        <label style={{ margin: 4 }}><b style={{ color: iyr && validation.iyr.test(iyr) ? 'green' : 'red' }}>iyr:</b>{iyr || <i>N/A</i>}</label>
        <label style={{ margin: 4 }}><b style={{ color: eyr && validation.eyr.test(eyr) ? 'green' : 'red' }}>eyr:</b>{eyr || <i>N/A</i>}</label>
        <label style={{ margin: 4 }}><b style={{ color: hgt && validation.hgt.test(hgt) ? 'green' : 'red' }}>hgt:</b>{hgt || <i>N/A</i>}</label>
        <label style={{ margin: 4 }}><b style={{ color: hcl && validation.hcl.test(hcl) ? 'green' : 'red' }}>hcl:</b>{hcl || <i>N/A</i>}</label>
        <label style={{ margin: 4 }}><b style={{ color: ecl && validation.ecl.test(ecl) ? 'green' : 'red' }}>ecl:</b>{ecl || <i>N/A</i>}</label>
        {cid && <label style={{ margin: 4 }}><b>cid:</b>{cid}</label>}
    </div>;
};

const App = () => {
    const [cards, setCards] = useState();
    const [error, setError] = useState();
    const onRefresh = async () => {
        try {
            const req = await fetch('kartyak');
            const cards = await req.json();
            setCards(cards);
        } catch (error) {
            setError(error.toString());
        }
    }
    useEffect(() => {
        onRefresh();
    }, []);
    return <div style={{ fontFamily: 'Arial' }}>
        {error && <div style={{ margin: 10, padding: 10, backgroundColor: 'red' }}>{error}</div>}
        {cards?.map((raw, index) => <Card key={index} raw={raw} />)}
    </div>;
};

export default App;