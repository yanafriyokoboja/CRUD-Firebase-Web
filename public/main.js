window.onload = inicializar ;
var from_validasi;
var mahasiswaRef;
var tableValidasi;
var CREATE = "Create";
var UPDATE ="Update";
var status=CREATE;
var editRef;

function inicializar(){
	from_validasi = document.getElementById("from-validasi");
	from_validasi.addEventListener("submit", validasiFirebase , false);
	tableValidasi =document.getElementById("tbody"); 
	mahasiswaRef = firebase.database().ref().child("mahasiswa");
	tampil();
}

function tampil(){

	mahasiswaRef.on("value", function(snapshot)
	{
		var data = snapshot.val();
		var files ="";
		for(var key in data)
		{
			files += "<tr>"+
							   "<td>" + data[key].nim + "</td>"+ 
							   "<td>" + data[key].nama + "</td>"+
							   "<td>" + data[key].alamat + "</td>"+
							   "<td>" + data[key].usia + "</td>"+
							   '<td>'+'<button class="btn btn-primary edit" data-validasi="'+key+'">Edit</button>'+'</td>' +
							   '<td>'+'<button class="btn btn-danger hapus" data-validasi="'+key+'">Hapus</button>'+'</td>' +
							  "<tr>";
			

		}
		tableValidasi.innerHTML= files;
		if (files !="") {	

			var elementEditTabel = document.getElementsByClassName("edit");
			for (var i =0; i<elementEditTabel.length; i++) {
				elementEditTabel[i].addEventListener("click",editaFirebase,false);			}


			var elementHapusTable = document.getElementsByClassName("hapus");
			for (var i =0; i<elementHapusTable.length; i++) {
				elementHapusTable[i].addEventListener("click",hapusFirebase,false);			}
		}
	});
}

function editaFirebase(){
	var keyEdit = this.getAttribute("data-validasi");
	editRef = mahasiswaRef.child(keyEdit);
	editRef.once("value", function(snap){
		var data = snap.val();
		document.getElementById("nim_id").value = data.nim;
		document.getElementById("nama_id").value = data.nama;
		document.getElementById("alamat_id").value = data.alamat;
		document.getElementById("usia_id").value = data.usia;
	});
	document.getElementById("buttom-form").value =UPDATE;
	status = UPDATE;
	

}

function hapusFirebase(){
	var keyHapus = this.getAttribute("data-validasi");
	var hapusRef = mahasiswaRef.child(keyHapus);
	hapusRef.remove();
}



function validasiFirebase(event){
	event.preventDefault();

    switch(status)
    {
    	case CREATE:	
	    mahasiswaRef.push({
		nim : event.target.nim.value,
		nama : event.target.nama.value,
		alamat : event.target.alamat.value,
		usia : event.target.usia.value
	});
	break;
		case UPDATE:
		editRef.update({
		nim : event.target.nim.value,
		nama : event.target.nama.value,
		alamat : event.target.alamat.value,
		usia : event.target.usia.value
		})
      document.getElementById("buttom-form").value =UPDATE;

    }
	from_validasi.reset();
}
