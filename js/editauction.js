$(document).ready(function () {

    getAuction();

    $('#auction-table-body').on('click', '#end_auction', function () {
        let useremail = $(this).attr('useremail');
        let auctionid = $(this).attr('auctionid');
        let biddingtitle = $(this).attr('biddingtitle');

        console.log(useremail);
        console.log(auctionid);
        console.log(biddingtitle);

        $.ajax({
            url: 'http://localhost:8080/bidding/endbidding',
            type: 'DELETE',
            data: {
                'useremail': useremail,
                'auctionid': auctionid,
                'biddingtitle': biddingtitle
            },
            success: function (data) {
                if (data.ended) {
                    window.location.reload();
                }
                else if (!data.ended) {
                    alert(data.message)
                }
            },
            error: function () {
                alert('Something went wrong')
            }

        })
    })

})

function getAuction() {
    let biddingTable = $('#auction-table').DataTable();
    $.getJSON('http://localhost:8080/bidding/getbiddingforadmin', function (biddingdata) {
        let data = biddingdata.data;
        $.each(data, function (index) {
            biddingTable.row.add([
                data[index].username,
                data[index].auctiontitle,
                data[index].acutionprice,
                data[index].biddingprice,
                data[index].useremail,
                '<img src="' + 'http://localhost:8080/asset/uploads/images/auctions/' + data[index].auctionimage + '" class="img-fluid img-thumbnail" width="80px;"></img>',
                '<button id="end_auction" biddingtitle="' + data[index].auctiontitle + '"' + '  useremail="' + data[index].useremail + '"' + ' auctionid="' + data[index].auctionid + '"' + ' biddingid="' + data[index]._id + '"' + 'class="btn btn-success" id="btn_delete_drink">  <i class="fa fa-tick"></i> End auction </button>',

            ]).draw(false)
        })
    })
}

