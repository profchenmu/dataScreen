import './matrix.scss';
const matrixData =
    [['Property', 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    ['Availability', 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    ['Company', 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    ['Contacts', 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
    ['Transaction', 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0],
    ['Financial', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ['Fee Forecast', 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0],
    ['Digital Assets', 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0]]
const tableBody = document.getElementById('table-info');
let tpl: string = (matrixData.map((e) => {
    return `<tr>${(e.map((f) => {
        return `${typeof f === 'string' ? `<td class="col-item">${f}</td>` : (f === 1 ? '<td class="active"></td>' : '<td class="inactive"></td>')}`
    })).join('')}</tr>`
})).join('')
tableBody.innerHTML = tpl;