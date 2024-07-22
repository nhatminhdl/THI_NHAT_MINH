
import {format} from 'date-fns';
import {toZonedTime,fromZonedTime} from 'date-fns-tz'
const { zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz');

const sortable = (field: string, sort: any) => {
    // Xác định kiểu sắp xếp hiện tại
    const sortType: 'default' | 'asc' | 'desc' = field === sort.column ? sort.type : 'default';
  
    // Các biểu tượng tùy thuộc vào kiểu sắp xếp
    const icons: { [key in 'default' | 'asc' | 'desc']: string } = {
      default: "fa-solid fa-sort",
      asc: "fa-solid fa-arrow-down-wide-short",
      desc: "fa-solid fa-arrow-up-wide-short",
    };
  
    // Các kiểu sắp xếp thay thế
    const types: { [key in 'default' | 'asc' | 'desc']: 'asc' | 'desc' } = {
      default: "desc",
      asc: "desc",
      desc: "asc",
    };
  
    // Xác định kiểu sắp xếp và biểu tượng tương ứng
    const type = types[sortType];
    const icon = icons[sortType];
  
    // Tạo liên kết sắp xếp
    const href = `?_sort&column=${field}&type=${type}`;
    const output = `<a href="${href}"><i class="${icon}"></i></a>`;
    
    return output;
  };

  const formatDate = (date: Date, type: any) => {
    const timeZone = 'UTC';
    const utcDate = zonedTimeToUtc(date, timeZone);
    const zonedDate = utcToZonedTime(utcDate, timeZone);
    const formattedDate = format(zonedDate, type);
    return formattedDate;
  }

  export {sortable, formatDate}