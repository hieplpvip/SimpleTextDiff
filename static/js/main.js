var diffRendered = false;
var patch = '';

function copyToClipboard(text) {
  var listener = function(ev) {
    ev.clipboardData.setData("text/plain", text);
    ev.preventDefault();
  };
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}

function renderDiff(alertIfIdentical) {
  var text1 = $('#inputText1').val();
  var text2 = $('#inputText2').val();
  if (text1 === text2) {
    if (alertIfIdentical) {
      alert('Two texts are identical!');
    }
    $('#diffResult').html('');
    diffRendered = false;
  } else {
    patch = Diff.createTwoFilesPatch('Text 1', 'Text 2', text1, text2);
    var diffHtml = Diff2Html.html(patch, {
      drawFileList: false,
      outputFormat: $('#diff-options-output-format :selected').val(),
      matching: $('#diff-options-matching :selected').val(),
      matchWordsThreshold: $('#diff-options-match-words-threshold').val(),
      matchingMaxComparisons: $('#diff-options-matching-max-comparisons').val()
    });
    $('#diffResult').html(diffHtml);

    // Change header
    $('.d2h-file-name:first').text('Diff Result');
    $('.d2h-tag:first').attr('class', 'd2h-tag d2h-changed d2h-changed-tag');
    $('.d2h-tag:first').text('CHANGED');

    // Add copy button
    $('.d2h-file-name-wrapper:first').append(`
      <button class="btn btn-light" id="copyButton" data-toggle="tooltip" data-placement="bottom" title="Copied!">
        <img src="/static/img/clippy.svg" height="16" width="12" alt="Copy to clipboard">
      </button>
    `);
    $('#copyButton').tooltip({
      trigger: 'click'
    });
    $('#copyButton').click(function() {
      copyToClipboard(patch);
      $('#copyButton').blur();
    });
    $('#copyButton').mouseleave(function() {
      $('#copyButton').tooltip('hide');
    });

    diffRendered = true;
  }
}

$(document).ready(function() {
  $('#clearButton').click(function() {
    $('#inputText1').val('');
    $('#inputText2').val('');
    $('#diffResult').html('');
    diffRendered = false;
  });

  $('#swapButton').click(function() {
    var text1 = $('#inputText1').val();
    var text2 = $('#inputText2').val();
    $('#inputText1').val(text2);
    $('#inputText2').val(text1);
    if (diffRendered) {
      renderDiff(false);
    }
  });

  $('.options').change(function() {
    renderDiff(false);
  });

  $('#diffButton').click(function() {
    renderDiff(true);

    // Scroll to top
    $(window).scrollTop(0);
  });

  $(document).bind('keydown', 'Alt+Ctrl+D', function() {$('#diffButton').click(); return false; });
  $(document).bind('keydown', 'Alt+Ctrl+C', function() {$('#clearButton').click(); return false; });
  $(document).bind('keydown', 'Alt+Ctrl+S', function() {$('#swapButton').click(); return false; });
  $('.inputText').bind('keydown', 'Alt+Ctrl+D', function() {$('#diffButton').click(); return false; });
  $('.inputText').bind('keydown', 'Alt+Ctrl+C', function() {$('#clearButton').click(); return false; });
  $('.inputText').bind('keydown', 'Alt+Ctrl+S', function() {$('#swapButton').click(); return false; });
});
