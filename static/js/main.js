var diffRendered = false;

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
    var patch = Diff.createPatch('Diff Result', text1, text2);
    var diffHtml = Diff2Html.html(patch, {
      drawFileList: false,
      outputFormat: $('#diff-options-output-format :selected').val(),
      matching: $('#diff-options-matching :selected').val(),
      matchWordsThreshold: $('#diff-options-match-words-threshold').val(),
      matchingMaxComparisons: $('#diff-options-matching-max-comparisons').val()
    });
    $('#diffResult').html(diffHtml);
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
  });

  $(document).bind('keydown', 'Alt+Ctrl+D', function() {$('#diffButton').click(); return false; });
  $(document).bind('keydown', 'Alt+Ctrl+C', function() {$('#clearButton').click(); return false; });
  $(document).bind('keydown', 'Alt+Ctrl+S', function() {$('#swapButton').click(); return false; });
  $('.inputText').bind('keydown', 'Alt+Ctrl+D', function() {$('#diffButton').click(); return false; });
  $('.inputText').bind('keydown', 'Alt+Ctrl+C', function() {$('#clearButton').click(); return false; });
  $('.inputText').bind('keydown', 'Alt+Ctrl+S', function() {$('#swapButton').click(); return false; });
});
