import dayjs from 'dayjs'

// 返回时间戳
export function timeFormat(type, day = 0) {
	let time = new Date().setHours(0, 0, 0, 0)
	if (type === 'end') { // 仅返回今天 23:59:59
		return dayjs(time).valueOf() + 24 * 60 * 60 * 1000 - 1
	} else if (type === 'start') { // 表示几天前的凌晨0点
		return dayjs(time).valueOf() - day * 24 * 60 * 60 * 1000
	}
}

// 返回前几天的日期 + 凌晨/深夜 -----moment版
export function dateOfDay(day = 0, type = 'start') {
	return momentStart2End(dayjs().date(dayjs().date() - day), type)
}

// 返回某日期的凌晨/深夜-----moment版
export function momentStart2End(time, type = 'start', fmt = 'YYYY-MM-DD HH:mm:ss') {
	return type === 'start' ? dayjs(dayjs(time).startOf('day').valueOf()).format(fmt) : dayjs(dayjs(time).endOf('day').valueOf()).format(fmt)
}

// 返回几(天/月/年)前的日期
// params: type 'days','months','years'
export function getBeforeDay(day, type = 'months') {
	return dayjs().subtract(day, type).format('YYYY-MM-DD')
}

// 将毫秒转换为时分秒
export function formatDuring(mss) {
	var day = parseInt(mss / (1000 * 60 * 60 * 24));
	var hour = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minute = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
	var second = parseInt((mss % (1000 * 60)) / 1000);
	return {
		day,
		hour,
		minute,
		second
	}
}

export function weekName(index) {
	const weekArr = '周一_周二_周三_周四_周五_周六_周日'.split('_');
	return weekArr[index]
}

export function wxTimes(date) {
	let strDayName = '';
	date = Number(date)
	const diff = dayjs(new Date()).diff(dayjs(date), 'days')
	if(diff === 0) {
		strDayName = dayjs(date).format('HH:mm')
	}else if(diff === 1) {
		strDayName = '昨天'
	}else if(diff === 2) {
		strDayName = '前天'
	}else {
		strDayName = dayjs(date).format('YYYY-MM-DD')
	}
	return strDayName
}
