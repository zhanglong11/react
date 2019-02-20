export const modules = [
    { title: '安全监控', value: 'monitorSafe' },
    { title: '生产监控', value: 'monitorProduct' }
];

export const moduleSubFunctions = {
    monitorSafe: [
        { name: '机电', key: 'd2', icon: '' }
    ],
    monitorProduct: [
        { name: '监控总状态', key: 'allStatus', icon: '' },
        { name: '工作面概览', key: 'd1', icon: '' },
        { name: '工作面详情', key: 'workingFaceDefail', icon: '' },
        { name: '工作面报表', key: 'workingFaceReport', icon: '' }
    ]
};