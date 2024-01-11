const length = 5;
const year = new Date().getFullYear() - length;
export default LocalData = {
    Finalcial_Year: [...Array(length).keys()].map(v => `${year + v}/${year + v + 1}`),
    year_Of_Construction: [...Array(length).keys()].map(v => `${year + v}`),
    ProgresReportHead: ['No', 'Modal Acitivity','Status'],
    ProgressReportTable: [
        {
            No: '1.1',
            Modal_Activity: 'District Water Supply and Sanitation Coordination Committee meetings',
            Approved_Annual_Workplan_Target: '4',
            Target_Quarter: '1',
            Performance_in_Quarter_Achieved: '',
            Cumulative_to_Date_Achieved: '0',
            Percentage_Workplan: '0',
            'Expenditure (Quarter) (Ugx)': '',
            'Cumulative Expenditure(Ugx)': '0',
            'Annual Budget(Ugx)': '54,00,000',
            Comments: ''
        },
        {
            No: '1.3',
            Modal_Activity: 'Extension Staff Meetings',
            Approved_Annual_Workplan_Target: '1',
            Target_Quarter: '0',
            Performance_in_Quarter_Achieved: '',
            Cumulative_to_Date_Achieved: '0',
            Percentage_Workplan: '0',
            'Expenditure (Quarter) (Ugx)': '',
            'Cumulative Expenditure(Ugx)': '0',
            'Annual Budget(Ugx)': '18,00,000',
            Comments: ''
        },
        {
            No: '2.1',
            Modal_Activity: 'Procurement of computers and printers',
            Approved_Annual_Workplan_Target: '4',
            Target_Quarter: '0',
            Performance_in_Quarter_Achieved: '',
            Cumulative_to_Date_Achieved: '0',
            Percentage_Workplan: '0',
            'Expenditure (Quarter) (Ugx)': '',
            'Cumulative Expenditure(Ugx)': '0',
            'Annual Budget(Ugx)': '40,00,000',
            Comments: ''
        }
    ]
}