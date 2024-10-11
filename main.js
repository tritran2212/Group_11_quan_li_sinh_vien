var danhsachsinhvien = new DanhSachSinhVien();
var validation =  new Validation();

// bổ sung thuộc tính
SinhVien.prototype.DiemToan= '';
SinhVien.prototype.DiemLi= '';
SinhVien.prototype.DiemHoa= '';
SinhVien.prototype.DTB= '';
SinhVien.prototype.Loai= '';
// Thêm phuong thức
SinhVien.prototype.TinhDTB = function()
{
    this.DTB=(Number(this.DiemToan)+Number(this.DiemLi)+Number(this.DiemHoa))/3;
}
SinhVien.prototype.XepLoai= function()
{
    if(this.DTB<=10&& this.DTB>=8)
    {
        this.Loai="Xep Loai Gioi";
    }
    else if(this.DTB<8 && this.DTB>=6.5){
        this.Loai="Kha";
    }
    else if(this.DTB<6.5 && this.DTB>5){
        this.Loai="Trung Binh ";
    }
    else{
        this.Loai= "Xep loai yeu "
    }
}
function DomID(id){
      return document.getElementById(id);
}
function ThemSinhVien()
{
    // lấy dữ liệu  từ nguoif dùng nhập vào
    var masv =DomID('masv').value;
    var hoten =DomID('hoten').value;
    var cmnd=DomID('cmnd').value;
    var email =DomID('email').value;
    var sdt =DomID('sdt').value;
    var loi=0;
    if(KiemTraRongDauVao('masv',masv)==true)
    {
        loi++;
    }
    if(KiemTraRongDauVao('hoten',hoten)==true)
    {
        loi++;
    }
    if(KiemTraRongDauVao('cmnd',cmnd)==true)
    {
         loi++;
    }
    // kiểm tra Rỗng email và đúng với định dạng email @gmail.com
    if(validation.validateEmail(email)){
        document.getElementById('email').style.borderColor='green';

    }
    else{
        document.getElementById('email').style.borderColor='red';
        loi++;
    }
    // kiểm Rỗng và độ dài số điện thoại = 10 
    if(validation.phonenumber(sdt)){
        document.getElementById('sdt').style.borderColor='green';
    }
    else{
        document.getElementById('sdt').style.borderColor='red';
        loi++;
    }
    if(loi!=0)
    {
        return ;
    }


     // thêm sinh viên
      var sinhvien= new SinhVien(masv,hoten,email,sdt,cmnd);
        sinhvien.DiemToan=DomID('Toan').value;
        sinhvien.DiemHoa =DomID('Hoa').value;
        sinhvien.DiemLi  =DomID('Li').value;
        sinhvien.TinhDTB();
        sinhvien.XepLoai();

      danhsachsinhvien.ThemSinhVien(sinhvien);
      CapNhapDanhSachSV(danhsachsinhvien); 
     
      

}

function KiemTraRongDauVao(ID,value)
{
    if(validation.KiemTraRong(value)==true)
    {
        DomID(ID).style.borderColor = ' red';
        return true;
    }
    else
    {
        DomID(ID).style.borderColor = ' green';
        return false;
    }
}

function CapNhapDanhSachSV(DanhSachSV)
{
    var listTableSV= DomID('tbodySinhVien');
    listTableSV.innerHTML= " ";
    for(var i = 0 ; i < DanhSachSV.DSSV.length ; i++)
    {
        // lấy thông  tin sinh viên từ mảng sinh viên
        var sv = DanhSachSV.DSSV[i];
        // tạo thẻ tr
        var trSinhVien = document.createElement('tr');
        // tạo sau cùng
             trSinhVien.id=sv.MaSV;
             trSinhVien.className='trSinhVien';
             trSinhVien.setAttribute("onclick","ChinhSuaSinhVien('"+sv.MaSV+"')");
        // tạo các  thẻ  td và filter 
        var tdCheckBox =document.createElement('td');

        var ckbMaSinhVien =document.createElement('input');
        // set thuộc tính cho thẻ input checkbox
        ckbMaSinhVien.setAttribute('class','ckbMaSinhVien');
        ckbMaSinhVien.setAttribute('type','checkbox');
        ckbMaSinhVien.setAttribute('value',sv.MaSV);
         //thêm input vào thể td 
        tdCheckBox.appendChild(ckbMaSinhVien);

        var tdMaSV= TaoTheTD('MaSv',sv.MaSV);
        var tdHoTen= TaoTheTD('HoTen',sv.HoTen);
        var tdCMND= TaoTheTD('CMND',sv.CMND);
        var tdEmail= TaoTheTD('Email',sv.Email);
        var tdSoDT= TaoTheTD('SoDt',sv.SoDt);
        // tạo các thẻ  td xếp loại  và DTB 
        var tdDTB= TaoTheTD('DTB',sv.DTB);
        var tdXepLoai=TaoTheTD('XepLoai',sv.Loai);
        
       trSinhVien.appendChild(tdCheckBox);
        // trSinhVien.appendChild(tdCheckBox);

        trSinhVien.appendChild(tdMaSV);
        trSinhVien.appendChild(tdHoTen);
        trSinhVien.appendChild(tdEmail);
        trSinhVien.appendChild(tdCMND);
        
        trSinhVien.appendChild(tdSoDT);

        trSinhVien.appendChild(tdDTB);
        trSinhVien.appendChild(tdXepLoai);
        // append tr vao tbodySinhVien
        listTableSV.appendChild(trSinhVien);

    }

}

function TaoTheTD (className,value)
{
    var td = document.createElement('td');
        td.className= className;
        td.innerHTML=value;
    return td;
}

function SetStorage()
{
    // chuyển đổi object mảng thành chuỗi danh sách sinh viên thành chuỗi json
    var jsonDanhSachSinhVien =JSON.stringify(danhsachsinhvien.DSSV);
    // Rồi đem chuỗi json lưu vào storage và đặt tên là DanhSachSV
    localStorage.setItem('DanhSachSv',jsonDanhSachSinhVien);


}

function GetStorage()
{
    var  jsonDanhSachSinhVien = localStorage.getItem('DanhSachSv');
    var mangDSSV = JSON.parse(jsonDanhSachSinhVien);
    danhsachsinhvien.DSSV=mangDSSV;
    CapNhapDanhSachSV(danhsachsinhvien);

}
// Xoa sinh viên 
function XoaSinhVien(){
    // Mảng checkbox
    var listMaSV =document.getElementsByClassName("ckbMaSinhVien");
    //Mảng mã sinh viên được chọn
    var listMaSVChon =[];
    for(i =0;i<listMaSV.length;i++){
        if(listMaSV[i].checked)
        {
            listMaSVChon.push(listMaSV[i].value);
        }
    }
    danhsachsinhvien.XoaSinhVien(listMaSVChon);
    CapNhapDanhSachSV(danhsachsinhvien);
}
function TimKiemSinhVien()
{
    var tukhoa = DomID('tukhoa').value;
     var lstDANHSACHTIMKIEM=danhsachsinhvien.TimKiemSinhVien(tukhoa);

     CapNhapDanhSachSV(lstDANHSACHTIMKIEM);
}

function ChinhSuaSinhVien(masv)
{
    var sinhvien =danhsachsinhvien.TimSVTheoMa(masv);
    if(sinhvien!=null)
    {
        DomID("masv").value =sinhvien.MaSV ;
        DomID("hoten").value =sinhvien.HoTen ;
        DomID("email").value =sinhvien.Email;
        DomID("cmnd").value =sinhvien.CMND ;
        DomID("sdt").value =sinhvien.SoDt ;

         
    }
}
function LuuThongTin()
{
    var masv =DomID('masv').value;
    var hoten =DomID('hoten').value;
    var cmnd=DomID('cmnd').value;
    var email =DomID('email').value;
    var sdt =DomID('sdt').value;
    var loi=0;
    if(KiemTraRongDauVao('masv',masv)==true)
    {
        loi++;
    }
    if(KiemTraRongDauVao('hoten',hoten)==true)
    {
        loi++;
    }
    if(KiemTraRongDauVao('cmnd',cmnd)==true)
    {
         loi++;
    }
    // kiểm tra Rỗng email và đúng với định dạng email @gmail.com
    if(validation.validateEmail(email)){
        document.getElementById('email').style.borderColor='green';

    }
    else{
        document.getElementById('email').style.borderColor='red';
        loi++;
    }
    // kiểm Rỗng và độ dài số điện thoại = 10 
    if(validation.phonenumber(sdt)){
        document.getElementById('sdt').style.borderColor='green';
    }
    else{
        document.getElementById('sdt').style.borderColor='red';
        loi++;
    }
    if(loi!=0)
    {
        return ;
    }


     // thêm sinh viên
      var sinhvien= new SinhVien(masv,hoten,email,sdt,cmnd);
        sinhvien.DiemToan = DomID('Toan').value;
        sinhvien.DiemHoa  = DomID('Hoa').value;
        sinhvien.DiemLi   = DomID('Li').value;
        sinhvien.TinhDTB();
        sinhvien.XepLoai();
        danhsachsinhvien.SuaSinhVien(sinhvien);
       CapNhapDanhSachSV(danhsachsinhvien); 
} 