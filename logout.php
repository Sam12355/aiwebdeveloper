<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Logging out...</title>
</head>
<body>
<script>
  // Clear every wdlk_ key — a partial list causes stale session bugs
  var toRemove = [];
  for (var i = 0; i < localStorage.length; i++) {
    var k = localStorage.key(i);
    if (k && k.indexOf('wdlk_') === 0) toRemove.push(k);
  }
  toRemove.forEach(function(k){ localStorage.removeItem(k); });
  window.location.href = 'index.php';
</script>
</body>
</html>
