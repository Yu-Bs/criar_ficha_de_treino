$(document).ready(function () {
    var page = 1;
    var current_page = 1;
    var total_page = 0;
    var is_ajax_fire = 0;
    var types = new Map();
    var dataCon;
    createHeadTable();
    createForm();
    createEditForm();
    manageData();

    function manageData() {

        $.ajax({
            dataType: 'json',
            url: 'getFicha.php',
            data: {page: page}
        }).done(function (data) {
            total_page = Math.ceil(data.total / 10);
            current_page = page;
            $('#pagination').twbsPagination({
                totalPages: total_page,
                visiblePages: current_page,
                onPageClick: function (event, pageL) {
                    page = pageL;
                    if (is_ajax_fire != 0) {
                        getPageData();
                    }
                }
            });

            manageRow(data.data);
            is_ajax_fire = 1;
        });
    }

    function getPageData() {
        $.ajax({
            dataType: 'json',
            url: 'getFicha.php',

            data: {page: page}
        }).done(function (data) {
            manageRow(data.data);
        });
    }

    function manageRow(data) {

        dataCon = data;
        var rows = '';
        var i = 0;
        $.each(data, function (key, value) {
            rows = rows + '<tr>';
            rows = rows + '<td>' + value.idFicha + '</td>';
            rows = rows + '<td>' + value.nomeExercicio + '</td>';
            rows = rows + '<td>' + value.grupoMuscular + '</td>';
            rows = rows + '<td>' + value.repeticoes + '</td>';
            rows = rows + '<td>' + value.series + '</td>';
            rows = rows + '<td>' + value.carga + '</td>';
            rows = rows + '<td data-id="' + i++ + '">';
            rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">Editar</button> ';
            rows = rows + '</td>';
            rows = rows + '</tr>';
        });

        $("tbody").html(rows);
    }
    function createHeadTable() {

        var rows = '<tr>';
        rows = rows + '<th> Código </th>';
        rows = rows + '<th> Nome do Exercicio </th>';
        rows = rows + '<th> Grupo Muscular </th>';
        rows = rows + '<th> Repetições </th>';
        rows = rows + '<th> Séries </th>';
        rows = rows + '<th> Carga </th>';
        rows = rows + '<th width="200px">Ação</th>';
        rows = rows + '</tr>';
        $("thead").html(rows);
    }
    function createForm() {

        var html = '';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="idFicha">Código</label>';
        html = html + '<input type="text" name="idFicha" class="form-control" data-error="Por favor entre com o idFicha" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="nomeExercicio">Nome do Exercicio</label>';
        html = html + '<input type="text" name="nomeExercicio" class="form-control" data-error="Por favor entre com o nome do exercicio" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="grupoMuscular">Grupo Muscular</label>';
        html = html + '<input type="text" name="grupoMuscular" class="form-control" data-error="Por favor entre com o grupo muscular" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="repeticoes">Repeticoes</label>';
        html = html + '<input type="text" name="repeticoes" class="form-control" data-error="Por favor entre com o número de repetições" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="series">Series</label>';
        html = html + '<input type="text" name="series" class="form-control" data-error="Por favor entre com o número de séries" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="carga">Carga</label>';
        html = html + '<input type="text" name="carga" class="form-control" data-error="Por favor entre com o peso" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<button type="submit" class="btn crud-submit btn-success">Salvar</button>';
        html = html + '</div>';
        $("#create-item").find("form").html(html);
    }
    function createEditForm() {

        var html = '<input type="hidden" name="cod" class="edit-id">';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="idFIcha">Código</label>';
        html = html + '<input type="text" name="idFicha" class="form-control" data-error="Por favor entre com o idFicha" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="nomeExercicio">Nome do Exercicio</label>';
        html = html + '<input type="text" name="nomeExercicio" class="form-control" data-error="Por favor entre com o nome do exercicio" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="grupoMuscular">Grupo Muscular</label>';
        html = html + '<input type="text" name="grupoMuscular" class="form-control" data-error="Por favor entre com o grupo muscular" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="repeticoes">Repeticoes</label>';
        html = html + '<input type="text" name="repeticoes" class="form-control" data-error="Por favor entre com o número de repetições" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="series">Series</label>';
        html = html + '<input type="text" name="series" class="form-control" data-error="Por favor entre com o número de séries" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="carga">Carga</label>';
        html = html + '<input type="text" name="carga" class="form-control" data-error="Por favor entre com o peso" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<button type="submit" class="btn crud-submit-edit btn-success">Salvar</button>';
        html = html + '</div>';
        $("#edit-item").find("form").html(html);

    }


    $(".crud-submit").click(function (e) {
        e.preventDefault();
        var form_action = $("#create-item").find("form").attr("action");
        var idFicha = $("#create-item").find("input[name='idFicha']").val();
        var nomeExercicio = $("#create-item").find("input[name='nomeExercicio']").val();
        var grupoMuscular = $("#create-item").find("input[name='grupoMuscular']").val();
        var repeticoes = $("#create-item").find("input[name='repeticoes']").val();
        var series = $("#create-item").find("input[name='series']").val();
        var carga = $("#create-item").find("input[name='carga']").val();

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: form_action,
            data: {idFicha: idFicha, nomeExercicio: nomeExercicio, grupoMuscular: grupoMuscular, repeticoes: repeticoes, series: series, carga: carga}
        }).done(function (data) {
            $("#create-item").find("input[name='idFicha']").val('');
            $("#create-item").find("input[name='nomeExercicio']").val('');
            $("#create-item").find("input[name='grupoMuscular']").val('');
            $("#create-item").find("input[name='repeticoes']").val('');
            $("#create-item").find("input[name='series']").val('');
            $("#create-item").find("input[name='carga']").val('');
            getPageData();
            $(".modal").modal('hide');
            toastr.success(data.msg, 'Alerta de Sucesso', {timeOut: 5000});

        });

    });
    $("body").on("click", ".edit-item", function () {
        var index = $(this).parent("td").data('id');

        var idFicha = dataCon[index].idFicha;
        var nomeExercicio = dataCon[index].nomeExercicio;
        var grupoMuscular = dataCon[index].grupoMuscular;
        var repeticoes = dataCon[index].repeticoes;
        var series = dataCon[index].series;
        var carga = dataCon[index].carga;


        $("#edit-item").find("input[name='idFicha']").val(idFicha);
        $("#edit-item").find("input[name='nomeExercicio']").val(nomeExercicio);
        $("#edit-item").find("input[name='grupoMuscular']").val(grupoMuscular);
        $("#edit-item").find("input[name='repeticoes']").val(repeticoes);
        $("#edit-item").find("input[name='series']").val(series);
        $("#edit-item").find("input[name='carga']").val(carga);
    });

    $(".crud-submit-edit").click(function (e) {

        e.preventDefault();
        var form_action = $("#edit-item").find("form").attr("action");
        var idFicha = $("#edit-item").find("input[name='idFicha']").val();
        var nomeExercicio = $("#edit-item").find("input[name='nomeExercicio']").val();
        var grupoMuscular = $("#edit-item").find("input[name='grupoMuscular']").val();
        var repeticoes = $("#edit-item").find("input[name='repeticoes']").val();
        var series = $("#edit-item").find("input[name='series']").val();
        var carga = $("#edit-item").find("input[name='carga']").val();

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: form_action,
            data: {idFicha: idFicha, nomeExercicio: nomeExercicio, grupoMuscular: grupoMuscular, repeticoes: repeticoes, series:series, carga:carga}

        }).done(function (data) {

            getPageData();
            $(".modal").modal('hide');
            toastr.success(data.msg, 'Alerta de Sucesso', {timeOut: 5000});
        });


    });

    function getDataSelect(type, select) {

        $.ajax({
            dataType: 'json', url: 'Acesso' + type,
            data: {page: page}
        }).done(function (data) {
            manageSelectOption(data.data, select, type);
        });
    }


});
