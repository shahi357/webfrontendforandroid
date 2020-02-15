$(document).ready(function () {
    $('#btn-add-auction').click(function () {
        let title = $('#title').val();
        let minimalprice = $('#minimalprice').val();
        let auctionissuedate = $('#auctionissuedate').val();
        let auctionenddate = $('#auctionenddate').val();
        let auctionphoto = $('#auctionphoto');
        let description = $('#description').val();

        console.log(description)

        if (title == '' || minimalprice == '' || auctionissuedate == '' || auctionenddate == '' || description == '') {
            alert('Please fill all the fields');
        }

        else {
            UploadDatatoServer(auctionphoto, title, minimalprice, auctionissuedate, auctionenddate, description)
        }
    })
})



function UploadDatatoServer(imageUploadSelector, title, minimalprice, auctionissuedate, auctionenddate, description) {
    let formData = new FormData();
    let files = imageUploadSelector.get(0).files;
    if (files.length > 0) {
        formData.append("auctionphoto", files[0]);
        formData.append("title", title);
        formData.append("minimalprice", minimalprice);
        formData.append("auctionissuedate", auctionissuedate);
        formData.append("auctionenddate", auctionenddate);
        formData.append("description", description);
    }

    var fileDetails = imageUploadSelector[0].files[0]
    var fileSize = fileDetails.size;

    if (fileSize > 1000000) {
        alert('Image size is larger');
    }

    else {

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/auction/addauction',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,

            success: function (data) {
                if (data.added) {
                    alert(data.message)
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000)
                }

                else if (!data.added) {
                    alert(data.message)
                }
            },
            error: function () {
                alert('Something went wrong')

            }
        });
    }
}