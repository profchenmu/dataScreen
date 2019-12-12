import './matrix.scss';
const matrixData =
    [['Property', 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1],
    ['Leads/Demands', 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    ['Company', 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    ['Contacts', 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    ['Activities', 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    ['Lease/Sale', 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
    ['Transaction', 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0],
    ['Availability', 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    ['Finance', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    ['App Usage', 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
    ['Brand', 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['Opportunity', 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    ['FFS', 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    ['Employee', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    ['Digital Assets', 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0]]
const tableBody = document.getElementById('table-info');
let tpl: string = (matrixData.map((e) => {
    return `<tr>${(e.map((f) => {
        return `${typeof f === 'string' ? `<td>${f}</td>` : (f === 1 ? '<td class="active"></td>' : '<td class="inactive"></td>')}`
    })).join('')}</tr>`
})).join('')
tableBody.innerHTML = tpl;